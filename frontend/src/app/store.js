import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import productSlice from '../features/product/productSlice';

export const store = configureStore({
    reducer: {
        authSlice,
        productSlice,
    },
})