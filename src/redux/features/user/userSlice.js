import { createSlice } from "@reduxjs/toolkit";
import { verifyUser } from "./userAsyncActions";

const initialState = {
  userInfo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      (state.userInfo = null),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.userInfo = action?.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User is verified";
      })
      .addCase(verifyUser.rejected, (state) => {
        state.userInfo = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "User is not verified";
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
