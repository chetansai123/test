import * as ValueService from "../services/valueService.js";

export const getStocks = async (req, res, next) => {
    try {
        const response = await ValueService.getStocks();
        res.json(response);
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
    }
}