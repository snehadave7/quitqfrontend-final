import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviewList: [],
};
 
export const addNewReview = createAsyncThunk(
  "/addNewReview",
  async ({ reviewData }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(reviewData);
    const response = await axios.post(
      "https://localhost:7152/api/Reviews",
      {
        userId: reviewData.userId,
        productId: reviewData.productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        reviewDate: reviewData.reviewDate,
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
    console.log(response);
    return response.data;
  }
);
export const deleteReview = createAsyncThunk(
  "/deleteReview",
  async (id) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.delete(
      `https://localhost:7152/api/Reviews?id=${id}`,
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

export const fetchReview=createAsyncThunk("/fetchReview",
  async(productId)=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(
      `https://localhost:7152/api/Reviews/${productId}`,
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
)

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.isLoading = false;
         console.log(action.payload);
        state.reviewList = action.payload.$values;
      })
      .addCase(fetchReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewList = [];
      })
      .addCase(addNewReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewList = action.payload;
      })
      .addCase(addNewReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewList = [];
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.reviewList = action.payload;
      })
      .addCase(deleteReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewList = [];
      });
  },
});
export default reviewSlice.reducer;
