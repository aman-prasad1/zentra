import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    placeOrderApi,
} from './orderApi.js';


export const placeOrder = createAsyncThunk(
    'order/create-order',
    async (orderData, { rejectWithValue }) => {
        try {
            return placeOrderApi(orderData);
        } catch (error) {
            return rejectWithValue (error.message);
        }
    }
)


const orderSlice = createSlice({
    name: order,
    initialState: {
        newOrders: [],
        oldOrders: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.newOrders = [],
                state.status = 'order',
                state.error = null
            })
    }
})

export default orderSlice.reducer;