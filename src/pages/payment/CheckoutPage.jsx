import React, { useEffect, useState } from "react";
import img from "../../assests/accImg.png";
import AddAddressForm from "../userProfile/AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItem } from "../../service/cartItemsSlice";
import { toast } from "react-toastify";
import { addNewOrder } from "../../service/orderSlice";
import { addNewPayment } from "../../service/paymentSlice";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
const CheckoutPage = ( { setCartSize }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "credit-card",
  });
  const userId = parseInt(localStorage.getItem("userId"));
  const [addressId, setAddressId] = useState(null);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const cartId = parseInt(localStorage.getItem("cartId"));
  const navigate = useNavigate();

  useEffect(() => {
    if (cartId) {
      dispatch(fetchCartItem(cartId));
    }
  }, [dispatch, cartId]);

  const totalCartAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = async () => {
    if (!currentSelectedAddress) {
      toast.error("Please select an address for delivery.");
      return;
    }
    const currentTS = new Date();
    for (const item of cartItems) {
      console.log(item);
      let orderData = {
        userId: userId,
        productId: item.product.id,
        orderDate: currentTS,
        quantity: item.quantity,
        orderStatus: "placed",
        addressId: currentSelectedAddress.id,
      };
      dispatch(addNewOrder(orderData)).then((data) => {
        const payment = {
          orderId: parseInt(data.payload),
          status:
            formData.paymentMethod === "credit-card" ||
            formData.paymentMethod === "paypal"
              ? "Completed"
              : "Pending",
          method: formData.paymentMethod,
          paymentDate: currentTS,
        };
        dispatch(addNewPayment({ payment })).then(() => {
          toast.success("Order Placed");
          navigate("/account/orders");
        });
      });
    }
     setCartSize(0);
  };

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-8">
          <h3>Select Delivery Address</h3>
          <AddAddressForm
            setCurrentSelectedAddress={setCurrentSelectedAddress}
            currentSelectedAddress={currentSelectedAddress}
          />
        </div>

        <div className="col-md-4">
          <h3>Your Cart</h3>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div className="card mb-3" key={index}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`https://localhost:7152/${item.product.imageUrl}`}
                      alt={item.product.name}
                      className="img-fluid rounded-start"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.product.name}</h5>
                      <p className="card-text">
                        Price: ₹{item.product.price * item.quantity} <br />
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="mt-4 d-flex justify-content-between">
            <span className="font-weight-bold">Total:</span>
            <span className="font-weight-bold">₹{totalCartAmount()}</span>
          </div>
          <div className="form-group mb-3 mt-4">
            <label className="form-label">Payment Method</label>
            <select
              className="form-select"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>
          <button
            onClick={handleCheckout}
            type="submit"
            className="btn btn-dark w-100 mt-3"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
