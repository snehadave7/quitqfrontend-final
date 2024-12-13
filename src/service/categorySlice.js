import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
  isLoading:false,
  categoryList:[]
}
export const addNewCategory=createAsyncThunk("/category/addNewCategory",
  async({category})=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      "",
      {
        name: category.name,
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

export const fetchAllCategory=createAsyncThunk("/category/fetchAllCategory",
  async()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get("https://localhost:7152/api/ProductCategories", {
      headers: {
        Authorization: `Bearer ${storedUser.token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });
   
    return response.data;
  }
)
 
const categorySlice=createSlice({
  name:"category",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(addNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(addNewCategory.rejected, (state) => {
        state.isLoading = false;
        state.categoryList = [];
      })
      .addCase(fetchAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
       
        state.categoryList = action.payload.$values;
      })
      .addCase(fetchAllCategory.rejected, (state) => {
        state.isLoading = false;
        state.categoryList = [];
      }); 
  }
});
export default categorySlice.reducer;