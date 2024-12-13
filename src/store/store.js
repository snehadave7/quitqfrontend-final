import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../service/userSlice";
import productSlice from "../service/productSlice"
import shoppingCartSlice from "../service/cartItemsSlice";
import addressSlice from "../service/addressSlice";
import orderReducer from "../service/orderSlice";
import shopSearchSlice  from "../service/searchSlice";
import categorySlice from "../service/categorySlice";
import subCategorySlice from "../service/subCategorySlice";
import reviewSlice from "../service/reviewSlice";
import reportSlice from "../service/reportSlice";
import adminUserSlice from "../service/adminUserSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    shopProduct: productSlice,
    shopCart: shoppingCartSlice,
    shopAddress: addressSlice,
    order: orderReducer,
    shopSearch: shopSearchSlice,
    shopCategory: categorySlice,
    shopSubCategory: subCategorySlice,
    review: reviewSlice,
    report: reportSlice,
    adminUser: adminUserSlice
  },
});

export default store;
