import WebSocket from 'ws';
import CalculateRSI from './RSI';
import { SqliteCreate, SqliteInsert } from './Database';

let ClosingPrices5: number[] = [];
let ClosingPrices15: number[] = [];
let LatestRSI5: number;
let LatestRSI15: number;
let VWAP24h: number;

const Ticker1m: any = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
const CandleData5m: any = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_5m');
const CandleData15m: any = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_15m');
const KrakenWebsocket: any = new WebSocket('wss://ws.kraken.com');

SqliteCreate();

KrakenWebsocket.on('open', () => {
    const subscribeMessage: any = {
        event: 'subscribe',
        pair: ['BTC/USDT'],
        subscription: {
            name: 'ohlc',
            interval: 1440 // 1 day interval
        }
    };
    KrakenWebsocket.send(JSON.stringify(subscribeMessage));
});

KrakenWebsocket.on('message', (message: { toString: () => string; }) => {
    const response = JSON.parse(message.toString());
    if (response.event !== 'heartbeat' && response[1]) {
        VWAP24h = parseFloat(response[1][6]);
    }
});

Ticker1m.on('message', (message: { toString: () => string; }) => {
    const result = JSON.parse(message.toString());
    const CurrentPrice = parseFloat(result.p);
    console.log(`Current Price: ${CurrentPrice} / 24h VWAP: ${VWAP24h} / 5min RSI: ${LatestRSI5 ? LatestRSI5.toFixed(1): null} / 15min RSI: ${LatestRSI15 ? LatestRSI15.toFixed(1) : null}`);

    CheckForBuySignal(CurrentPrice);
});

function CheckForBuySignal(CurrentPrice: number) {
    if (VWAP24h && LatestRSI5 < 30 && LatestRSI15 < 30 && CurrentPrice < VWAP24h) {
        SqliteInsert('Buy', CurrentPrice, VWAP24h, LatestRSI5.toFixed(1), LatestRSI15.toFixed(1));
        console.log(`Buy at ${CurrentPrice}`);
    } else if (VWAP24h && LatestRSI5 > 70 && LatestRSI15 > 30 && CurrentPrice > VWAP24h) {
        SqliteInsert('Sell', CurrentPrice, VWAP24h, LatestRSI5.toFixed(1), LatestRSI15.toFixed(1));
        console.log(`Sell at ${CurrentPrice}`);
    };
};

CandleData5m.onmessage = (event: { data: { toString: () => string; }; }) => {
    const Result = JSON.parse(event.data.toString());
    const Candle = Result.k;
    /*if (Candle.x) */HandleNewCandle(ClosingPrices5, Candle.c, '5min');
};

CandleData15m.onmessage = (event: { data: { toString: () => string; }; }) => {
    const Result = JSON.parse(event.data.toString());
    const Candle = Result.k;
    /*if (Candle.x) */HandleNewCandle(ClosingPrices15, Candle.c, '15min');
};

function HandleNewCandle(ClosingPrices: number[], CandleClose: string, Timeframe: string) {
    ClosingPrices.push(parseFloat(CandleClose));
    if (ClosingPrices.length > 15) {
        ClosingPrices.shift();
    };

    if (ClosingPrices.length >= 14) {
        const RSI = CalculateRSI(ClosingPrices);

        if (Timeframe === '5min') {
            LatestRSI5 = RSI;
        } else if (Timeframe === '15min') {
            LatestRSI15 = RSI;
        };
    };
};