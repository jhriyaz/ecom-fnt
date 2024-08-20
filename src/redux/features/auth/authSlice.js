import { createSlice } from "@reduxjs/toolkit";
import { doLogin } from "./authAsyncActions";

const initialState = {
  isAuthenticated: false,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isAuthenticated = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.isError = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state, action) => {
        state.isLoading = true;
        console.log(action.payload)
      })
      .addCase(doLogin.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
        state.message = "User logged in successfully";
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isSuccess = false;
        state.message = action.payload || "User fails to login";
        state.isError = true;
      });
  },
});

export const { reset, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
