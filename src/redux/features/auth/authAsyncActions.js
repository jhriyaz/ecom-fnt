import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const doLogin = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      console.log(error.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message)

    }
  }
);
