import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async ({addresses,userId}) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(addresses);
    const response = await axios.post(
      "https://localhost:7152/api/DeliveryAddresses",
      {
        userId:parseInt(userId),
        address:addresses.address,
        city:addresses.city,
        pincode:addresses.pincode,
        phone:addresses.phone,
        notes:addresses.notes,
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
export const fetchAllAddress = createAsyncThunk(
  "/addresses/fetchAllAddress",
  async (userId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/DeliveryAddresses?userId=${userId}`,
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
export const EditAddress = createAsyncThunk(
  "/addresses/EditAddress",
  async ({addressId,formData}) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(
      `https://localhost:7152/api/DeliveryAddresses/${addressId}`,
      {
        id:addressId,
        userId: formData.userId,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        phone: formData.phone,
        notes: formData.notes,
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
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async (addressId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.delete(
      `https://localhost:7152/api/DeliveryAddresses?id=${addressId}`,
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

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload;
        
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })

      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.$values;
        // console.log(action.payload.$values,"line 103 slice")
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      }) 
  },
});

export default addressSlice.reducer;