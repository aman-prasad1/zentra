import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, signUpApi, logoutApi } from './authApi.js';


export const signupUser = createAsyncThunk(
    'auth/signup',
    async (data, { rejectWithValue }) => {
        try {
            return await signUpApi(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            return await loginApi(credentials);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            return await logoutApi();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            user: null,
            status: 'idle',
            error: null
        },
        reducers: {

            forceLogout: (state) => {
                state.user = null,
                    state.status = 'idle',
                    state.error = null;
            }
        },
        extraReducers: (builder) => {
            builder
                // signup
                .addCase(signupUser.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(signupUser.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.user = action.payload.user;
                    state.error = null;
                })
                .addCase(signupUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload || "Signup Failed";
                })

                // login
                .addCase(loginUser.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.user = action.payload.user;
                    state.error = null;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload || "Login Failed";
                })

                // logout
                .addCase(logoutUser.fulfilled, (state) => {
                    state.user = null;
                    state.status = "idle";
                    state.error = null;
                })
                .addCase(logoutUser.pending, (state) => {
                    state.user = null;
                    state.status = "idle";
                    state.error = null;
                })
                .addCase(logoutUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload || "Login Failed";
                })
        }
    },
)

export const { forceLogout } = authSlice.actions;
export default authSlice.reducer;