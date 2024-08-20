import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { setAuthenticated } from "../auth/authSlice";

//verify user
export const verifyUser = createAsyncThunk(
  "user/verify",
  async (_data, thunkAPI) => {
    try {

      const data = await userService.verifyUser();

      thunkAPI.dispatch(setAuthenticated(true));

      return data
    } catch (error) {
      console.log(error)
      const message =
        (error?.response &&
          error?.response?.data &&
          error?.response?.data.errors.message) ||
        "Error occured fetching the user info";
      thunkAPI.dispatch(setAuthenticated(false));
      return thunkAPI.rejectWithValue(message);
    }
  }
);
