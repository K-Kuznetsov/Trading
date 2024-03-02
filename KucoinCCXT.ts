import ccxt from 'ccxt';
import 'dotenv/config';
require('events').EventEmitter.defaultMaxListeners = 15;

const KucoinAPIkey = process.env.KucoinAPIkey;
const KucoinAPIsecret = process.env.KucoinAPIsecret;
const KucoinPassword = process.env.KucoinPassword;

const Currencies = ['KAS', 'MYRO', 'NEON', 'MAVIA'];

const KucoinData = async () => {
    const exchange = new ccxt.kucoin({
        apiKey: KucoinAPIkey,
        secret: KucoinAPIsecret,
        password: KucoinPassword,
        options: {
            adjustForTimeDifference: true,
        }
    });

    const balance = await exchange.fetchBalance();

    Currencies.forEach(Currency => {
        console.log(balance[Currency].free);
    });
};

KucoinData();
