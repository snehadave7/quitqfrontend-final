import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  searchResult: [],
};

export const getSearchResults = createAsyncThunk(
  "/product/getSearchResults",
  async (productName) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Products/by-ProductName/${productName}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResult = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResult = action.payload.$values;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResult = [];
      });
  },
});

export default searchSlice.reducer;
export const { resetSearchResults } = searchSlice.actions;
