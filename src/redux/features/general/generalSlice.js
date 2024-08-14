import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./generalAsyncAction";

const initialState = {
  categories: {
    categoriesData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.isLoading = false;
      state.categories.isSuccess = true;
      state.categories.categoriesData = action.payload?.categories;
      state.categories.message = "Categories fetched successfully";
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categories.isLoading = false;
      state.categories.isSuccess = false;
      state.categories.isError = true;
      state.categories.categoriesData = [];
      state.categories.message = "Categories fetching failed";
    });
  },
});

export default generalSlice.reducer;
