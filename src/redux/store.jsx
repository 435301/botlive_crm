import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import studentReducer from "./slices/studentSlice";
import subAdminReducer from "./slices/subAdminSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    student: studentReducer,
    subAdmin: subAdminReducer,
  },
});

export default store;