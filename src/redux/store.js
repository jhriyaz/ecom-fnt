import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import userSlice from "./features/user/userSlice";
import generalSlice from "./features/general/generalSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    general: generalSlice,
  },
  devTools: true,
});

export default store;
