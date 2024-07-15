import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './slices/stockSlice.js';

const store = configureStore({
    reducer: {
        stocks: stockReducer,
    },
});
export default store;