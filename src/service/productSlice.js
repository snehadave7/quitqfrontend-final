import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};
export const addProduct = createAsyncThunk(
  "addProduct",
  async ({ productData }) => {
    console.log(productData);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      "https://localhost:7152/api/Products",
      {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        imageUrl: productData.imageUrl,
        sellerId: productData.sellerId,
        categoryId: productData.categoryId,
        subCategoryId: productData.subCategoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withproductData: true,
      }
    );
    return response.data;
  }
);

export const fetchProductBySellerId = createAsyncThunk(
  "fetchProduct",
  async ({ sellerId }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Products/${sellerId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withproductData: true,
      }
    );
    return response.data;
  }
);

export const EditProduct = createAsyncThunk(
  "/editProduct",
  async ({ formData }) => {
    console.log(formData);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(
      `https://localhost:7152/api/Products/${formData.id}`,
      {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        imageUrl: formData.imageUrl,
        sellerId: formData.sellerId,
        categoryId: formData.categoryId,
        subCategoryId: formData.subCategoryId,
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
export const deleteProduct = createAsyncThunk(
  "/deleteProduct",
  async ({ productId }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.delete(
      `https://localhost:7152/api/Products?id=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("from add",action.payload);
        state.productList = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductBySellerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductBySellerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.$values;
        //  console.log(action.payload);
      })
      .addCase(fetchProductBySellerId.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(EditProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("from update",action.payload);
        state.productList = action.payload;
        
      })
      .addCase(EditProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
         console.log("from deleted",action.payload);
        state.productList = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productSlice.reducer;
