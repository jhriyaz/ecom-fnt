import { createAsyncThunk } from "@reduxjs/toolkit";
import generalService from "./generalService";

export const fetchCategories = createAsyncThunk(
  "/general/getCategories",
  async (_data, thunkAPI) => {
    try {
      return await generalService.getCategories();
    } catch (error) {
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data.errors.message) ||
        "Error occured fetching the user info";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
