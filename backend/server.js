import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import { connectDb } from './mainDb.js';
import valueRoutes from "./routes/valueRoutes.js"
import { pollStocks } from './services/valueService.js';

const app = express();
connectDb();

app.use(express.json());
app.use(cors());

app.use('/api/value', valueRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
    setInterval(pollStocks, 10000);
})


