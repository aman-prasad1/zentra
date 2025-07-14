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

export const getCart = createAsyncThunk(
    'cart/getCart',
    (_, { rejectWithValue }) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart) {
            return cart;
        }
        else {
            return rejectWithValue("No Items in cart");
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

                // add to cart
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

                // get cart
                .addCase(getCart.fulfilled, (state, action) =>{
                    state.cartItems = action.payload.cartItems;
                    state.totalPrice = action.payload.totalPrice;
                    state.loading = false;
                    state.error = null;
                })

        }
    }
)

export default cartSlice.reducer;