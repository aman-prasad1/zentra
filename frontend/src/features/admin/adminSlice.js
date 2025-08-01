import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAllUserApi,
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

const adminSlice = createSlice(
    {
        name: 'admin',
        initialState: {
            users: [],
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
        }
    }
)

export default adminSlice.reducer;