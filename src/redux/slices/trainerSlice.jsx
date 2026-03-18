import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";
import Cookies from "js-cookie";
import {toast} from "react-hot-toast";

export const trainerLogin = createAsyncThunk(
    "trainerAdmin/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/trainerAdmin/login`, credentials);
            const data = response.data;

            if (!data.status || !data.data?.token) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }
            Cookies.set("trainer-token", data.data.token, {
                expires: 7, // 7 days
                secure: false, // if it is https set to true
                sameSite: "Strict",
            });

            Cookies.set("trainer", JSON.stringify(data.data), {
                expires: 7,
                secure: false,
                sameSite: "Strict",
            });

            toast.success(data.message);
            return data.data;
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// SEND OTP
export const trainerSendOtp = createAsyncThunk(
    "trainerAdmin/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/trainerAdmin/forgotPassword`, {
                email,
            });

            const data = response.data;

            if (!data.status) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }

            toast.success(data.message);
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to send OTP";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// VERIFY OTP
export const trainerVerifyOtp = createAsyncThunk(
    "trainerAdmin/verifyOtp",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/trainerAdmin/verifyOtp`, {
                email,
                otp,
            });

            const data = response.data;

            if (!data.status) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }

            toast.success(data.message);
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "OTP verification failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// RESET PASSWORD
export const trainerResetPassword = createAsyncThunk(
    "trainerAdmin/resetPassword",
    async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/trainerAdmin/resetPassword`, {
                email,
                newPassword,
                confirmPassword,
            });

            const data = response.data;

            if (!data.status) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }

            toast.success(data.message);
            return data;
        } catch (error) {
            const message =
                error.response?.data?.message || "Password reset failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

const trainerSlice = createSlice({
    name: "trainer",
    initialState: {
        loading: false,
        trainer: Cookies.get("trainer")
            ? JSON.parse(Cookies.get("trainer"))
            : null,
        token: Cookies.get("trainer-token") || null,
        error: null,
    },
    reducers: {
        logoutTrainer: (state) => {
            state.admin = null;
            state.token = null;
            Cookies.remove("trainer");
            Cookies.remove("trainer-token");
            toast.success("Logged out successfully");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(trainerLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(trainerLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.trainer = action.payload;
                state.token = action.payload.token;
            })
            .addCase(trainerLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(trainerSendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(trainerSendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(trainerSendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(trainerVerifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(trainerVerifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(trainerVerifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(trainerResetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(trainerResetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(trainerResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { logoutTrainer } = trainerSlice.actions;
export default trainerSlice.reducer;