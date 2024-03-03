import 'dotenv/config';
import BinanceData from './BinanceCCXT';
import KucoinData from './KucoinCCXT';

const BinanceAPIkey: string = process.env.BinanceAPIkey || '';
const BinanceAPIsecret: string = process.env.BinanceAPIsecret || '';
const BinancePassword: string = process.env.BinancePassword || '';

const KucoinAPIkey: string = process.env.KucoinAPIkey || '';
const KucoinAPIsecret: string = process.env.KucoinAPIsecret || '';
const KucoinPassword: string = process.env.KucoinPassword || '';

const main = async () => {
    const BinanceWallet = await BinanceData(BinanceAPIkey, BinanceAPIsecret, BinancePassword);
    const KucoinWallet = await KucoinData(KucoinAPIkey, KucoinAPIsecret, KucoinPassword);

    console.log(BinanceWallet);
    console.log(KucoinWallet);
};

main();