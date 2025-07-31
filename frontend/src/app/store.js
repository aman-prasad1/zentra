import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import productSlice from '../features/product/productSlice';
import cartSlice from '../features/cart/cartSlice';
import orderSlice from '../features/order/orderSlice.js';
import adminSlice from '../features/admin/adminSlice.js';

export const store = configureStore({
    reducer: {
        authSlice,
        productSlice,
        cartSlice,
        orderSlice,
        adminSlice,
    },
})