import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  paymentList: [],
};

export const addNewPayment = createAsyncThunk(
  "/payment/addNewPayment",
  async ({ payment }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      "https://localhost:7152/api/Payments",
      {
        orderId:payment.orderId,
        status:payment.status,
        method:payment.method,
        paymentDate:payment.paymentDate
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



const paymentSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentList = action.payload;
      })
      .addCase(addNewPayment.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default paymentSlice.reducer;
