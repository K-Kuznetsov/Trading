import ccxt from 'ccxt';
import 'dotenv/config';
require('events').EventEmitter.defaultMaxListeners = 15;

const KucoinData = async (Key: string, Secret: string, Password: string) => {
    const exchange = new ccxt.kucoin({
        apiKey: Key,
        secret: Secret,
        password: Password,
        options: {
            adjustForTimeDifference: true,
        }
    });

    //await new Promise(resolve => setTimeout(resolve, 5000));
    const Balance = await exchange.fetchBalance();

    const KucoinWallet = Object.entries(Balance.total).reduce((acc: {[key: string]: number}, [key, value]) => {
        if ((value as number) > 0) {
            acc[key] = value as number;
        };
        return acc;
    }, {} as {[key: string]: number});
    
    return KucoinWallet;
};

export default KucoinData;