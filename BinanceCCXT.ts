import ccxt from 'ccxt';
import 'dotenv/config';
require('events').EventEmitter.defaultMaxListeners = 15;

const BinanceAPIkey = process.env.BinanceAPIkey;
const BinanceAPIsecret = process.env.BinanceAPIsecret;

const BinanceData = async () => {
    const exchange = new ccxt.binance({
        apiKey: BinanceAPIkey,
        secret: BinanceAPIsecret,
        options: {
            adjustForTimeDifference: true,
        }
    });

    const balance = await exchange.fetchBalance();
    console.log(balance.total);
};
BinanceData();