import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProductsApi,
} from './productApi.js';


export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (data, { rejectWithValue }) => {
        try {
            return await getProductsApi(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const productSlice = createSlice(
    {
        name: 'product',
        initialState: {
            products: [],
            productCount: 0,
            resultPerPage: 8,
            productDetail: null,
            loading: false,
            error: null
        },
        reducers: {

        },
        extraReducers: (builder) => {
            builder

                // get products
                .addCase(getProducts.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getProducts.fulfilled, (state, action) => {
                    state.products = action.payload.data.products;
                    state.productCount = action.payload.data.productCount;
                    state.resultPerPage = action.payload.data.resultPerPage;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(getProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch products";
                })
        }
    }
)

export default productSlice.reducer