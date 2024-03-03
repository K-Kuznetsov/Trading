import axios from 'axios';

async function PortfolioValue(Portfolio: any, APIkey: string) {
    const Currencies: string = Object.keys(Portfolio).join(',');
    const FinalURL: string = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${Currencies}&CMC_PRO_API_KEY=${APIkey}`;

    try {
        const Response = await axios.get(FinalURL);
        const Prices = Response.data.data;

        Object.keys(Portfolio).forEach(key => {
            if (Prices[key] && Prices[key].quote && Prices[key].quote.USD && Prices[key].quote.USD.price) {
                Portfolio[key] = (parseFloat(Prices[key].quote.USD.price) * parseFloat(Portfolio[key])).toFixed(2);
            } else {
                console.log(`Price information for ${key} is not available`);
            };
        });

        return Portfolio;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching portfolio values');
    };
};

export default PortfolioValue;