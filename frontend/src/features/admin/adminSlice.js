import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAllUserApi,
    getSingleUserApi,
} from '../admin/adminApi.js';


export const getAllUser = createAsyncThunk(
    'admin/all-user',
    async(_, { rejectWithValue }) => {
        try {
            return await getAllUserApi();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const getSingleUser = createAsyncThunk(
    'admin/user/id',
    async(id, { rejectWithValue }) => {
        try {
            return await getSingleUserApi(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const adminSlice = createSlice(
    {
        name: 'admin',
        initialState: {
            users: [],
            singleUser: null,
            loading: false,
            error: null
        },
        reducers: {

        },
        extraReducers: (builder) => {
            builder
                
                // get-all-user
                .addCase(getAllUser.pending, (state) => {
                    state.users = [];
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getAllUser.fulfilled, (state, action) => {
                    state.users = action.payload.data.allUsers;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(getAllUser.rejected, (state, action) => {
                    state.users = [];
                    state.loading = false;
                    state.error = action.payload;
                })

                // get-single-user
                .addCase(getSingleUser.pending, (state) => {
                    state.singleUser = null;
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getSingleUser.fulfilled, (state, action) => {
                    state.singleUser = action.payload.data.user;
                    state.loading = false;
                    state.error = null;
                })
                .addCase(getSingleUser.rejected, (state, action) => {
                    state.singleUser = null;
                    state.loading = false;
                    state.error = action.payload;
                })
        }
    }
)

export default adminSlice.reducer;