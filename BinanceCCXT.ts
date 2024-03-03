import ccxt from 'ccxt';
import 'dotenv/config';
require('events').EventEmitter.defaultMaxListeners = 15;

const BinanceData = async (Key: string, Secret: string, Password: string) => {
    const exchange = new ccxt.binance({
        apiKey: Key,
        secret: Secret,
        password: Password,
        options: {
            adjustForTimeDifference: true,
        }
    });

    //await new Promise(resolve => setTimeout(resolve, 5000));
    const balance = await exchange.fetchBalance();
    const BinanceWallet = Object.entries(balance.total).reduce((acc: { [key: string]: number }, [key, value]) => {
        if (value > 0) {
            acc[key] = value;
        };
        return acc;
    }, {} as { [key: string]: number });

    return BinanceWallet;
};

export default BinanceData;