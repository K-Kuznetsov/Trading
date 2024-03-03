import 'dotenv/config';
import { BinanceSetup, GetBinanceAmounts } from './BinanceCCXT';
import { KucoinSetup, GetKucoinAmounts} from './KucoinCCXT';
import PortfolioValue from './CoinMarketCap';

const BinanceAPIkey: string = process.env.BinanceAPIkey || '';
const BinanceAPIsecret: string = process.env.BinanceAPIsecret || '';
const BinancePassword: string = process.env.BinancePassword || '';
const KucoinAPIkey: string = process.env.KucoinAPIkey || '';
const KucoinAPIsecret: string = process.env.KucoinAPIsecret || '';
const KucoinPassword: string = process.env.KucoinPassword || '';
const CoinMarketCapAPIkey: string = process.env.CoinMarketCapAPIkey || '';

async function Main() {
    const BinanceExchange = await BinanceSetup(BinanceAPIkey, BinanceAPIsecret, BinancePassword);
    const BinanceAmounts = await GetBinanceAmounts(BinanceExchange);
    const BinanceValue = await PortfolioValue(BinanceAmounts, CoinMarketCapAPIkey);

    const KucoinExchange = await KucoinSetup(KucoinAPIkey, KucoinAPIsecret, KucoinPassword);
    const KucoinAmounts = await GetKucoinAmounts(KucoinExchange);    
    const KucoinValue = await PortfolioValue(KucoinAmounts, CoinMarketCapAPIkey);

    console.log(BinanceValue);
    console.log(KucoinValue);
};

Main();