import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addToCartApi,
} from "./cartApi.js";


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (productId, { rejectWithValue }) => {
        try {
            return await addToCartApi(productId);
        } catch (error) {
            console.log(error)
            const message = error.message || "Product not added to cart"
            return rejectWithValue(message);
        }
    }
)


const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: {
            cartItems: [],
            totalPrice: 0,
            loading: false,
            error: null
        },
        reducers: {

        },
        extraReducers: (builder) => {
            builder

                // create order
                .addCase(addToCart.pending, (state) => {
                    state.loading = true
                })
                .addCase(addToCart.fulfilled, (state, action) => {
                    state.cartItems = action.payload.cartItems;
                    state.totalPrice = action.payload.totalPrice;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(addToCart.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        }
    }
)

export default cartSlice.reducer;