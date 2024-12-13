import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  salesList:[],
};
export const fetchAllOrdersForSeller = createAsyncThunk(
  "/orders/fetchAllOrdersForSeller",
  async ({ sellerId }) => {
    console.log("slice",sellerId);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Orders/bySellerId?sellerid=${sellerId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log("fetch order", response);
    return response.data;
  }
);

export const fetchAllOrdersForUser = createAsyncThunk(
  "/orders/fetchAllOrdersForUser",
  async ({ userId }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Orders?id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log("fetch order", response);
    return response.data;
  }
);

export const addNewOrder = createAsyncThunk(
  "/orders/addNewOrder",
  async (orderData) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      "https://localhost:7152/api/Orders",
      {
        userId: orderData.userId,
        productId: orderData.productId,
        orderDate: orderData.orderDate,
        quantity: orderData.quantity,
        orderStatus: orderData.orderStatus,
        addressId: orderData.addressId,
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

export const UpdateOrderStatus = createAsyncThunk(
  "/addresses/updateOrder",
  async ({ orderData }) => {
    console.log(orderData);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(
      `https://localhost:7152/api/Orders/${orderData.id}`,
      {
        id: orderData.id,
        userId: orderData.user.id,
        productId: orderData.product.id,
        orderDate: orderData.orderDate,
        quantity: orderData.quantity,
        orderStatus: orderData.orderStatus,
        addressId: orderData.address.id,
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
export const fetchSales = createAsyncThunk(
  "/orders/fetchSales",
  async ({ sellerId }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Orders/SalesReport?sellerId=${sellerId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log("fetch sales", response.data.$values);
    return response.data.$values;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.$values;
      })
      .addCase(fetchAllOrdersForUser.rejected, (state) => {
        state.isLoading = false;
        // state.orderList = [];
      })
      .addCase(fetchAllOrdersForSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersForSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action",action.payload);
        state.orderList = action.payload.$values;
      })
      .addCase(fetchAllOrdersForSeller.rejected, (state) => {
        state.isLoading = false;
        // state.orderList = [];
      })
      .addCase(addNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload;
      })
      .addCase(addNewOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesList = action.payload;
      })
      .addCase(fetchSales.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
