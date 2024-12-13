import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  subCategoryList: [],
};

export const addNewSubCategory = createAsyncThunk(
  "/SubCategory/addNewSubCategory",
  async ({ subCategory,categoryId }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      "",
      {
        name: subCategory.name,
        categoryId:categoryId
      },
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const fetchAllSubCategory = createAsyncThunk(
  "/subCategory/fetchAllSubCategory",
  async (categoryId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/SubCategories?catId=${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategoryList = action.payload;
      })
      .addCase(addNewSubCategory.rejected, (state) => {
        state.isLoading = false;
        state.subCategoryList = [];
      })
      .addCase(fetchAllSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategoryList = action.payload.$values;
      })
      .addCase(fetchAllSubCategory.rejected, (state) => {
        state.isLoading = false;
        state.subCategoryList = [];
      });
  },
});
export default subCategorySlice.reducer;
