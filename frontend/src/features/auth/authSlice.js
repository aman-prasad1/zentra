import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    signUpApi,
    verifyUserApi,
    loginApi,
    logoutApi,
    getUserApi,
 } from './authApi.js';


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

export const verifyUser = createAsyncThunk(
    'auth/verifyOTP',
    async (data, { rejectWithValue }) => {
        try {
            return await verifyUserApi(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

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

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            return await logoutApi();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUser = createAsyncThunk(
    'user/get-me',
    async(_, { rejectWithValue }) => {
        try{
            return await getUserApi();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const refreshTokens = createAsyncThunk(
    'user/refresh-tokens',
    async(_, { rejectWithValue }) => {
        try {
            return await refreshTokensApi();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

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
                    state.status = "verifying";
                    state.error = null;
                })
                .addCase(signupUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload || "Signup Failed";
                })

                // verify-user
                .addCase(verifyUser.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(verifyUser.fulfilled, (state) => {
                    state.status = "succeeded";
                    state.error = null;
                })
                .addCase(verifyUser.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload || "Verification falied";
                })

                // login
                .addCase(loginUser.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.user = action.payload.data.user;
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

                // get-user
                .addCase(getUser.pending, (state) => {
                    state.status = "loading";
                    state.error = null;
                })
                .addCase(getUser.fulfilled, (state, action) => {
                    state.user = action.payload.data.user;
                    state.status = "succeeded";
                })
                .addCase(getUser.rejected, (state, action) => {
                    state.status = "idle";
                })
        }
    },
)

export const { forceLogout } = authSlice.actions;
export default authSlice.reducer;