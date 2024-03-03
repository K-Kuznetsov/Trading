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
    const BinanceExchange: any = await BinanceSetup(BinanceAPIkey, BinanceAPIsecret, BinancePassword);
    const BinanceAmounts: any = await GetBinanceAmounts(BinanceExchange);
    const BinanceValue: any = await PortfolioValue(BinanceAmounts, CoinMarketCapAPIkey);

    const KucoinExchange: any = await KucoinSetup(KucoinAPIkey, KucoinAPIsecret, KucoinPassword);
    const KucoinAmounts: any = await GetKucoinAmounts(KucoinExchange);    
    const KucoinValue: any = await PortfolioValue(KucoinAmounts, CoinMarketCapAPIkey);

    console.log(BinanceValue);
    console.log(KucoinValue);
};

Main();