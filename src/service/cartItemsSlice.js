import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCartItem = createAsyncThunk(
  "cartItem/addToCart",
  async ({ cartId, productId, quantity }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Adding to cart", { cartId, productId, quantity });
    try {
      const response = await axios.post(
        "https://localhost:7152/api/CartItems",
        {
          cartId,
          productId,
          quantity,
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
      console.log("Response from adding to cart", response.data.result);
      if (response.data && response.data.id) {
        return response.data.result;
      } else throw new Error("Failed to add");
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const fetchCartItem = createAsyncThunk(
  "cartItem/fetchCartItem",
  async (cartId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/CartItems?cartId=${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    console.log("cart response data", response.data);
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cartItem/deleteCartItem",
  async (id ) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.delete(
      `https://localhost:7152/api/CartItems?id=${id}`,
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

export const updateCartItemQuantity = createAsyncThunk(
  "cartItem/updateCart",
  async ({ id, cartId, productId, quantity }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("cartitem id", id);
    console.log("cart id", cartId);
    console.log("product id", productId);
    const response = await axios.put(
      `https://localhost:7152/api/CartItems/${id}`,
      {
        id: id,
        cartId: cartId,
        productId: productId,
        quantity: quantity,
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

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.$values;
      })
      .addCase(fetchCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItemQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
