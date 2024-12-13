import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  adminUserList: [],
};

export const GetAllCustomer = createAsyncThunk("/customer", async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(
    `https://localhost:7152/api/Users/Customer`,
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
});
export const GetAllSeller = createAsyncThunk("/seller", async () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const response = await axios.get(`https://localhost:7152/api/Users/Seller`, {
    headers: {
      Authorization: `Bearer ${storedUser.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });
  console.log(response);
  return response.data;
});

export const Delete = createAsyncThunk(
  "adminUser/Delete",
  async (id) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    await axios.delete(`https://localhost:7152/api/Users?id=${id}`, {
      headers: {
        Authorization: `Bearer ${storedUser.token}`,
      },
    });
    return id;
  }
);
const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.adminUserList = action.payload.$values;
      })
      .addCase(GetAllCustomer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetAllSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.adminUserList = action.payload.$values;
      })
      .addCase(GetAllSeller.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminUserSlice.reducer;
