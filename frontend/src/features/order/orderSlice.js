import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    placeOrderApi,
} from './orderApi.js';


export const placeOrder = createAsyncThunk(
    'order/create-order',
    async (orderData, { rejectWithValue }) => {
        try {
            const res = await placeOrderApi(orderData);
            return res;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        newOrders: [],
        oldOrders: [],
        status: 'idle',
        error: null
    },
    addNewOrders: (state, action) => {
        state.status = "loading";
        for (const order of action.payload) {
            state.newOrders.push({ id: order._id, quantity: order.quantity });
        }
        state.status = "idle";
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.status = 'order',
                state.error = null
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = 'payment',
                console.log(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.newOrders = [];
            })
    }
})

export default orderSlice.reducer;