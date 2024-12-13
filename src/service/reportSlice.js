import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reportList: [],
};

export const GetTopSellersReport = createAsyncThunk(
  "/top-sellers",
  async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Reports/top-sellers`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  }
);
export const GetProductRevenueReport = createAsyncThunk(
  "/product-revenue",
  async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Reports/product-revenue`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response.data;
  }
);
export const GetCategoryRevenueReport = createAsyncThunk(
  "/category-revenue",
  async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Reports/category-revenue`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response.data;
  }
);
export const GetSubCategoryRevenueReport = createAsyncThunk(
  "/subcategory-revenue",
  async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Reports/subcategory-revenue`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    // console.log(response);
    return response.data;
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTopSellersReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTopSellersReport.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        
        state.reportList = action.payload.$values;
      })
      .addCase(GetTopSellersReport.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetProductRevenueReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetProductRevenueReport.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.reportList = action.payload.$values;
      })
      .addCase(GetProductRevenueReport.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetCategoryRevenueReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetCategoryRevenueReport.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.reportList = action.payload.$values;
      })
      .addCase(GetCategoryRevenueReport.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetSubCategoryRevenueReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSubCategoryRevenueReport.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.reportList = action.payload.$values;
      })
      .addCase(GetSubCategoryRevenueReport.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reportSlice.reducer;
