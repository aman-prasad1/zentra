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
    reducers: {
        addNewOrders: (state, action) => {
            state.status = "loading";
            for (const order of action.payload) {
                state.newOrders.push({ id: order.id, quantity: order.quantity });
            }
            state.status = "idle";
        },
        clearNewOrders: (state) => {
            state.newOrders = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.status = 'order',
                state.error = null
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                if(action.payload.data.order.paymentMethod === "COD") {
                    state.status = "success";
                } else {
                    state.status = "payment";
                }
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const {
    addNewOrders,
    clearNewOrders,
} = orderSlice.actions;

export default orderSlice.reducer;