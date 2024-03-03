import 'dotenv/config';
import BinanceData from './BinanceCCXT';
import KucoinData from './KucoinCCXT';
import PortfolioValue from './CoinMarketCap';

const BinanceAPIkey: string = process.env.BinanceAPIkey || '';
const BinanceAPIsecret: string = process.env.BinanceAPIsecret || '';
const BinancePassword: string = process.env.BinancePassword || '';
const KucoinAPIkey: string = process.env.KucoinAPIkey || '';
const KucoinAPIsecret: string = process.env.KucoinAPIsecret || '';
const KucoinPassword: string = process.env.KucoinPassword || '';
const CoinMarketCapAPIkey: string = process.env.CoinMarketCapAPIkey || '';

const Main = async () => {
    const BinanceAmounts = await BinanceData(BinanceAPIkey, BinanceAPIsecret, BinancePassword);
    const KucoinAmounts = await KucoinData(KucoinAPIkey, KucoinAPIsecret, KucoinPassword);
    console.log(BinanceAmounts);
    console.log(KucoinAmounts);
    const BinanceValue = await PortfolioValue(BinanceAmounts, CoinMarketCapAPIkey);
    const KucoinValue = await PortfolioValue(KucoinAmounts, CoinMarketCapAPIkey);
    console.log(BinanceValue);
    console.log(KucoinValue);
};

Main();