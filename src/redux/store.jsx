import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import studentReducer from "./slices/studentSlice";
import subAdminReducer from "./slices/subAdminSlice";
import trainerReducer from "./slices/trainerSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    student: studentReducer,
    subAdmin: subAdminReducer,
    trainer: trainerReducer,
  },
});

export default store;