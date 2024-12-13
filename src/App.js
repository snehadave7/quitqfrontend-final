import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./pages/home/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import CartPage from "./pages/cart/CartPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./pages/userProfile/Account";
import PrivateRoute from "./util/privateRoute";
import CheckoutPage from "./pages/payment/CheckoutPage";
import SearchProducts from "./pages/home/search";
import SellerLayout from "./pages/seller/layout";
import SellerDashboard from "./pages/seller/sellerDashboard";
import SellerProducts from "./pages/seller/seller-products";
import SellerOrders from "./pages/seller/seller-Orders";
import AdminLayout from "./pages/admin/admin-layout";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminUser from "./pages/admin/admin-users";
import AdminSeller from "./pages/admin/admin-sellers";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItem } from "./service/cartItemsSlice";

function App() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    const cartId = parseInt(localStorage.getItem("cartId"), 10);
    if (cartId) {
      dispatch(fetchCartItem(cartId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartItems) {
      setCartSize(cartItems.length);
    }
  }, [dispatch, cartItems]);
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Routes with Navbar */}
          <Route
            element={
              <>
                <Navbar cartSize={cartSize} />
                <Outlet />
              </>
            }
          >
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            {/* Customer Routes */}
            <Route element={<PrivateRoute allowedRoles={["customer"]} />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/clothing"
                element={<ProductsPage category="Clothing" />}
              />
              <Route
                path="/electronics"
                element={<ProductsPage category="Electronics" />}
              />
              <Route
                path="/groceries"
                element={<ProductsPage category="Groceries" />}
              />
              <Route path="/account/*" element={<Account />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/payment"
                element={<CheckoutPage setCartSize={setCartSize} />}
              />
              <Route path="/search" element={<SearchProducts />} />
            </Route>
          </Route>

          {/* Seller Routes (No Navbar) */}
          <Route element={<PrivateRoute allowedRoles={["seller"]} />}>
            <Route path="/seller" element={<SellerLayout />}>
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="orders" element={<SellerOrders />} />
              
            </Route>
          </Route>

          {/* Admin Routes (No Navbar) */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUser />} />
              <Route path="sellers" element={<AdminSeller />} />
            </Route>
          </Route>

          {/* Fallback for Undefined Routes */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
