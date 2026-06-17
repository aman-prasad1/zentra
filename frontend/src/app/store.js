import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/slices/authSlice';
import productSlice from '../features/product/slices/productSlice';
import cartSlice from '../features/cart/slices/cartSlice';
import orderSlice from '../features/order/slices/orderSlice.js';
import adminSlice from '../features/admin/slices/adminSlice.js';

export const store = configureStore({
    reducer: {
        authSlice,
        productSlice,
        cartSlice,
        orderSlice,
        adminSlice,
    },
})