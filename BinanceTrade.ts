import ccxt from 'ccxt';
import 'dotenv/config';
require('events').EventEmitter.defaultMaxListeners = 15;
import { BinanceSetup, GetBinanceAmounts } from './BinanceCCXT';

const BinanceAPIkey: string = process.env.BinanceAPIkey || '';
const BinanceAPIsecret: string = process.env.BinanceAPIsecret || '';
const BinancePassword: string = process.env.BinancePassword || '';


async function buy(exchange: any, symbol: string, amount: number, price: number) {
    if (exchange.has['createMarketBuyOrder']) {
        return await exchange.createMarketBuyOrder(symbol, amount, price);
    } else {
        throw new Error('Exchange does not support market buy orders');
    };
};

async function sell(exchange: any, symbol: string, amount: number, price: number) {
    if (exchange.has['createMarketSellOrder']) {
        return await exchange.createMarketSellOrder(symbol, amount, price);
    } else {
        throw new Error('Exchange does not support market sell orders');
    };
};

async function executeTrade() {
    try {
        const exchange = await BinanceSetup(BinanceAPIkey, BinanceAPIsecret, BinancePassword);
        const buyOrder = await buy(exchange, 'BTC/USDT', 0.01, 30000);
        console.log('Buy Order:', buyOrder);

        const sellOrder = await sell(exchange, 'BTC/USDT', 0.01, 35000);
        console.log('Sell Order:', sellOrder);
    } catch (error) {
        console.error(error);
    };
};

executeTrade();