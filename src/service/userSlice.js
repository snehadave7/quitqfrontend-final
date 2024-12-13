import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

async function checkCart(data, userId) {
  const checkCartRequest = await fetch(
    `https://localhost:7152/api/Carts/${userId.id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  let checkCartResponse=null;
  if(checkCartRequest.status===404){
   checkCartResponse = await checkCartRequest.text();
  }
  else{
   checkCartResponse = await checkCartRequest.json();
  }
  console.log(checkCartRequest);
  console.log(checkCartResponse);
  if (checkCartRequest.status === 404) return false;
  else return checkCartResponse.id;
}
async function createCart(data, userId) {
  // if (checkCartRequest.status === 404) {
  const createCart = await fetch("https://localhost:7152/api/Carts", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      userId: userId.id,
    }),
  });
  const resp = await createCart.json();
  const cartId = resp;
  console.log("response",resp);
  // } else {
  //   if (checkCartResponse) {
  //     const checkCart = JSON.parse(checkCartResponse);
  //     cartId = checkCart.id;
  //   }

  // console.log(cartId);
  // localStorage.setItem("cartId", JSON.stringify(cartId));
  return cartId;
}

export const loginUser = createAsyncThunk(
  "login",
  async (credentials, { dispatch }) => {
    try {
      const response = await fetch("https://localhost:7152/api/Auth/Login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },

        body: JSON.stringify({
          userName: credentials.username,
          password: credentials.password,
          expiresInMins: 60,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data?.status) return null;
      let userId = null;
      let cartId = null;
      let role = null;
      if (data) {
        const userIdRequest = await fetch(
          `https://localhost:7152/api/Users/${credentials.username}`,
          {
            method: "GET",
          }
        );
        userId = await userIdRequest.json();
        role = userId.role;
        if (userId.id) {
          localStorage.setItem("userId", JSON.stringify(userId.id));
          localStorage.setItem("role", userId.role);
        }
      }
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      console.log(role);
      if (role === "customer") {
        const cartStatus = await checkCart(data, userId);
        console.log("cartstatus", cartStatus);
        let cartId = null;
        if (cartStatus === false) {
          cartId = await createCart(data, userId);
          console.log(cartId);
        } else {
          cartId = cartStatus;
        }
        if (cartId) {
          localStorage.setItem("cartId", JSON.stringify(cartId));
        } else {
          console.log("Something went wrong");
        }
      }
        return { data, cartId };
        // const checkCartRequest = await fetch(
        //   `https://localhost:7152/api/Carts/${userId.id}`,
        //   {
        //     method: "GET",
        //     credentials: "include",
        //     headers: {
        //       Authorization: `Bearer ${data.token}`,
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //   }
        // );

        // const checkCartResponse = await checkCartRequest.text();
        // // console.log("Check cart response body", checkCartResponse);

        //   if (checkCartRequest.status === 404) {
        //     const createCart = await fetch("https://localhost:7152/api/Carts", {
        //       method: "POST",
        //       credentials: "include",
        //       headers: {
        //         Authorization: `Bearer ${data.token}`,
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //       },
        //       body: JSON.stringify({
        //         userId: userId.id,
        //       }),
        //     });
        //     const resp = await createCart.json();
        //     cartId = resp.id;
        //   } else {
        //     if (checkCartResponse) {
        //       const checkCart = JSON.parse(checkCartResponse);
        //       cartId = checkCart.id;
        //     }
        //   }
        //   console.log(cartId);
        //   localStorage.setItem("cartId", JSON.stringify(cartId));
        // }
        // return { data, cartId };
      
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const registerUser = createAsyncThunk(
  "register",
  async (credentials) => {
    console.log(credentials);
    const response = await fetch("https://localhost:7152/api/Auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        FirstName: credentials.firstName,
        LastName: credentials.lastName,
        UserName: credentials.userName,
        ContactNumber: credentials.contactNumber,
        Password: credentials.password,
        Email: credentials.email,
        Role: credentials.role,
        expiresInMins: 60, // optional, defaults to 60
      }),
    });
    const data = await response.json();
    console.log(data);
    // if(data?.status==="Error"){
    //   return data.message;
    // }
    if (data) {
      const userIdRequest = await fetch(
        `https://localhost:7152/api/Users/${credentials.username}`,
        {
          method: "GET",
        }
      );
    }

    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    // isAuthenticated:false,
    user: null,
    cartId: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.cartId = null;
      // state.isAuthenticated=false;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("cartId");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload == null) {
          state.user = null;
          state.cartId = null;
          state.error = "Invalid credentials";
        } else {
          state.user = action.payload.data;
          state.cartId = action.payload.cartId;
          state.error = null;
        }
        // state.isAuthenticated=true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error;
      });
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // if(action.payload==null){
        //   state.user=null;
        //   state.error="Data Inconsistent";
        // }
        // else{
        state.user = action.payload;
        state.error = null;
        // }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
