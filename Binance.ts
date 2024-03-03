import WebSocket from 'ws';
import CalculateRSI from './RSI';

let RSIperiod: number = 0;
const RSIoverbought: number = 70;
const RSIoversold: number = 30;
const CurrencyPair: string = 'btcusdt';
const CandleInterval: string = '1m';
const Portfolio: number = 70.82;
const TradeAmount: string = (Portfolio / 20).toFixed(7);

const BinanceWebsocket: any = new WebSocket(`wss://stream.binance.com:9443/ws/${CurrencyPair}@kline_${CandleInterval}`);

let ClosingPrices: number[] = [];

BinanceWebsocket.onmessage = function (event: any) {
    let BinanceResult: any = event.data ? JSON.parse(event.data.toString()) : '';
    let Candle: any = BinanceResult.k;

    if (Candle.x === true) {
        ClosingPrices.push(parseFloat(Candle.c));

        if (ClosingPrices.length > 15) {
            ClosingPrices.shift()
        };

        RSIperiod = ClosingPrices.length - 1;

        const RSI: number = CalculateRSI(RSIperiod, ClosingPrices);
        console.log(`Candle closed at ${Candle.c}, RSI: ${RSI.toFixed(2)}`);
        if (RSI < RSIoversold) {
            console.log(`Buy ${TradeAmount} at ${Candle.c}`);
        } else if (RSI > RSIoverbought) {
            console.log(`Sell ${TradeAmount} at ${Candle.c}`);
        };
        console.log(ClosingPrices);
    };
};

/*
const BinanceWebsocket = new WebSocket('wss://stream.binance.com:9443/ws/pixelusdt@trade');
const BuyingPrice: number = 0.618;
const Quantity: number = 124.7;
const TradingFee: number = 0.001;

let Prices: number[] = [];

BinanceWebsocket.onmessage = function (event) {
    const BinanceResult = event.data ? JSON.parse(event.data.toString()) : '';
    const CurrentPrice = parseFloat(BinanceResult.p);

    Prices.push(CurrentPrice);

    const MinPrice = Math.min(...Prices);
    const MaxPrice = Math.max(...Prices);
    const AvgPrice = (Prices.reduce((acc, price) => acc + price, 0) / Prices.length).toFixed(5);

    console.log(`Min: ${MinPrice}, Max: ${MaxPrice}, Average: ${AvgPrice}, Current: ${CurrentPrice}, Profit: ${((CurrentPrice * Quantity * (1 - TradingFee)) - (BuyingPrice * Quantity * (1 - TradingFee))).toFixed(2)}`);

    if (Prices.length > 3600) Prices.shift();
};*/