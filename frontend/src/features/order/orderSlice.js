import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    placeOrderApi,
    verifyPaymentApi,
    myOrdersApi,
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

export const verifyPayment = createAsyncThunk(
    'order/verify-payment',
    async (paymentDetails, { rejectWithValue }) => {
        try {
            const res = await verifyPaymentApi(paymentDetails);
            return res;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const myOrders = createAsyncThunk(
    'order/my-order',
    async (_, { rejectWithValue }) => {
        try {
            const res = await myOrdersApi();
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
        orderPayment: null,
        oldOrders: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addNewOrders: (state, action) => {
            state.status = "loading";
            state.newOrders = [];
            for (const order of action.payload) {
                state.newOrders.push({ id: order.id, quantity: order.quantity });
            }
            state.status = "idle";
        },
        addSingleOrder: (state, action) => {
            state.newOrders = [{id: action.payload[0].id, quantity: 1}];
        },
        clearNewOrders: (state) => {
            state.newOrders = [];
        },
    },
    extraReducers: (builder) => {
        builder

            // Order place
            .addCase(placeOrder.pending, (state) => {
                state.status = 'order',
                state.error = null
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                if(action.payload.data.order.paymentMethod === "COD") {
                    state.status = "success";
                } else {
                    state.status = "payment";
                    state.orderPayment = action.payload.data;
                    state.error = null;
                }
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // payment verification
            .addCase(verifyPayment.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.newOrders = [];
                state.orderPayment = null;
                state.status = 'success';
                state.error = null;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // my-orders
            .addCase(myOrders.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.oldOrders = [];
            })
            .addCase(myOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.oldOrders = action.payload.data.orders;
                state.error = null;
            })
            .addCase(myOrders.rejected, (state, action) => {
                state.status = "failed";
                state.oldOrders = [];
                state.error = action.payload;
            })
    }
})

export const {
    addNewOrders,
    addSingleOrder,
    clearNewOrders,
} = orderSlice.actions;

export default orderSlice.reducer;