import ccxt from 'ccxt';
import 'dotenv/config';
require('events').EventEmitter.defaultMaxListeners = 15;

async function KucoinSetup(Key: string, Secret: string, Password: string) {
    const KucoinExchange = new ccxt.kucoin({
        apiKey: Key,
        secret: Secret,
        password: Password,
        options: {
            adjustForTimeDifference: true,
        }
    });
    return KucoinExchange;
};


async function GetKucoinAmounts(KucoinExchange: any) {
    if (KucoinExchange.has['fetchBalance']) {
        const Balance = await KucoinExchange.fetchBalance();
        const KucoinAmounts = Object.entries(Balance.total).reduce((acc: { [key: string]: number }, [key, value]) => {
            if ((value as number) > 0) {
                acc[key] = value as number;
            };
            return acc;
        }, {} as { [key: string]: number });

        return KucoinAmounts;
    };
};


export { KucoinSetup, GetKucoinAmounts};