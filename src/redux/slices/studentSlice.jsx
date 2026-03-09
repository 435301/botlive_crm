import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";
import Cookies from "js-cookie";
import {toast} from "react-hot-toast";

export const studentLogin = createAsyncThunk(
    "student/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/student/login`, credentials);
            const data = response.data;

            if (!data.status || !data.data?.token) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }
            Cookies.set("student-token", data.data.token, {
                expires: 7, // 7 days
                secure: false, // if it is https set to true
                sameSite: "Strict",
            });

            Cookies.set("student", JSON.stringify(data.data), {
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
export const studentSendOtp = createAsyncThunk(
    "student/sendOtp",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/student/forgotPassword`, {
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
export const studentVerifyOtp = createAsyncThunk(
    "student/verifyOtp",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/student/verifyOtp`, {
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
export const studentResetPassword = createAsyncThunk(
    "student/resetPassword",
    async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/student/resetPassword`, {
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

const studentSlice = createSlice({
    name: "student",
    initialState: {
        loading: false,
        student: Cookies.get("student")
            ? JSON.parse(Cookies.get("student"))
            : null,
        token: Cookies.get("student-token") || null,
        error: null,
    },
    reducers: {
        logoutAdmin: (state) => {
            state.admin = null;
            state.token = null;
            Cookies.remove("student");
            Cookies.remove("student-token");
            toast.success("Logged out successfully");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(studentLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(studentLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.student = action.payload;
                state.token = action.payload.token;
            })
            .addCase(studentLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(studentSendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(studentSendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(studentSendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(studentVerifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(studentVerifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(studentVerifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(studentResetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(studentResetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(studentResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { logoutAdmin } = studentSlice.actions;
export default studentSlice.reducer;