import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProductsApi,
    getProductDetailsApi,
    addReviewApi,
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

export const getProductDetails = createAsyncThunk(
    'product/details',
    async (data, { rejectWithValue }) => {
        try {
            return await getProductDetailsApi(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addReview = createAsyncThunk(
    'product/addReview',
    async (data, { rejectWithValue }) => {
        try {
            return await addReviewApi(data);
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

                // get details
                .addCase(getProductDetails.pending, (state) => {
                    state.productDetail = null;
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getProductDetails.fulfilled, (state, action) => {
                    state.productDetail = action.payload.data.productDetail;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(getProductDetails.rejected, (state, action) => {
                    state.productDetail = null;
                    state.loading = false;
                    state.error = action.payload;
                })

                // add review
                .addCase(addReview.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(addReview.fulfilled, (state) => {
                    state.loading = false;
                    state.error = null;
                })
                .addCase(addReview.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to add review";
                });
        }
    }
)

export default productSlice.reducer