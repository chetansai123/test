import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    stocks: [],
    status: 'idle',
    error: '',
};

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/value/');
        return res.data;
    } catch (error) {
        console.error('Error fetching stocks:', error);
        throw error;
    }
});

const stockSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.stocks = action.payload;
            })
            .addCase(fetchStocks.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    },
});

export default stockSlice.reducer;