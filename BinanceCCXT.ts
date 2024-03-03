import ccxt from 'ccxt';
import 'dotenv/config';
require('events').EventEmitter.defaultMaxListeners = 15;

async function BinanceSetup(Key: string, Secret: string, Password: string) {
    const BinanceExchange = new ccxt.binance({
        apiKey: Key,
        secret: Secret,
        password: Password,
        options: {
            adjustForTimeDifference: true,
        }
    });
    return BinanceExchange;
};

async function GetBinanceAmounts(BinanceExchange: any) {
    if (BinanceExchange.has['fetchBalance']) {
        const Balance = await BinanceExchange.fetchBalance();
        const BinanceAmounts = Object.entries(Balance.total).reduce((acc: { [key: string]: number }, [key, value]) => {
            if ((value as number) > 0) {
                acc[key] = value as number;
            };
            return acc;
        }, {} as { [key: string]: number });

        return BinanceAmounts;
    };
};

export { BinanceSetup, GetBinanceAmounts };