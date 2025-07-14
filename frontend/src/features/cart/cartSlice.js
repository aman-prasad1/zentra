import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addToCartApi,
} from "./cartApi.js";


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (productDetail, { rejectWithValue }) => {
        try {
            return await addToCartApi(productDetail);
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

export const incQuantity = createAsyncThunk(
    'cart/incQnt',
    (productId, { rejectWithValue }) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart) {
            console.log(productId);
            const itemIndex = cart.cartItems.findIndex((item) => item.id === productId);
            if(itemIndex !== -1) {
                cart.cartItems[itemIndex].quantity += 1;
                cart.totalPrice += cart.cartItems[itemIndex].price;

                localStorage.setItem('cart', JSON.stringify(cart));
                return cart;
            }
            else {
                return rejectWithValue("Itme not present in cart");
            }
        }
        else {
            return rejectWithValue("No Items in cart");
        }
    }
)

export const decQuantity = createAsyncThunk(
    'cart/decQnt',
    (productId, { rejectWithValue }) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart) {
            const itemIndex = cart.cartItems.findIndex((item) => item.id === productId);
            if(itemIndex !== -1) {
                cart.cartItems[itemIndex].quantity -= 1;
                cart.totalPrice -= cart.cartItems[itemIndex].price;

                if(cart.cartItems[itemIndex].quantity <= 0) { // deleting from cart
                    cart.cartItems.splice(itemIndex, 1);
                }

                localStorage.setItem('cart', JSON.stringify(cart));

                return cart;
            }
            else {
                return rejectWithValue("Itme not present in cart");
            }
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

                // quantity inc dec case
                .addCase(incQuantity.fulfilled, (state, action) => {
                    state.cartItems = action.payload.cartItems;
                    state.totalPrice = action.payload.totalPrice;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(incQuantity.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(decQuantity.fulfilled, (state, action) => {
                    state.cartItems = action.payload.cartItems;
                    state.totalPrice = action.payload.totalPrice;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(decQuantity.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })

        }
    }
)

export default cartSlice.reducer;