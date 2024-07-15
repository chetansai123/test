import axios from "axios";
import Value from "../models/ValueSchema.js";

export const pollStocks = async () => {
    const cryptoSymbols = [
        'bitcoin',
        'ethereum',
        'cardano',
        'binancecoin',
        'ripple'
    ];
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbols.join(',')}&vs_currencies=usd`;
        const options = {
            method: 'GET',
            url,
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-pBKXeKm9CfpZHrXMP8zBkRmH' }
        };
        const response = await axios.request(options);
        const data = response?.data;
        const value = new Value({ data });
        await value.save();
        console.log('Data polled and saved:', data);
    } catch (error) {
        console.error('Error polling data:', error);
    }
}

export const getStocks = async () => {
    const stocks = await Value.find({}).sort({ createdAt: -1 }).limit(20);
    return stocks;
}