import WebSocket from 'ws';
import CalculateRSI from './RSI';

const RSIperiod: number = 14;
const RSIoverbought: number = 70;
const RSIoversold: number = 30;
const CurrencyPair: string = 'pixelusdt';
const CandleInterval: string = '1m';
const Portfolio: number = 1000;
const TradeAmount: number = Portfolio / 20;

const BinanceWebsocket: any = new WebSocket(`wss://stream.binance.com:9443/ws/${CurrencyPair}@kline_${CandleInterval}`);

let ClosingPrices: number[] = [
    0.54, 0.5407, 0.5404,
    0.5398, 0.5386, 0.539,
    0.5384, 0.5367, 0.5384,
    0.538, 0.5379, 0.5382,
    0.5386, 0.5383, 0.5387
];

BinanceWebsocket.onmessage = function (event: any) {
    let BinanceResult: any = event.data ? JSON.parse(event.data.toString()) : '';
    let Candle: any = BinanceResult.k;

    if (Candle.x === true) {
        ClosingPrices.push(parseFloat(Candle.c));
        if (ClosingPrices.length > RSIperiod + 1) {
            ClosingPrices.shift()
        };
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