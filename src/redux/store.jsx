import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import studentReducer from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    student: studentReducer,
  },
});

export default store;