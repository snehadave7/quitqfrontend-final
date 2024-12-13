import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCartItem,
  fetchCartItem,
  updateCartItemQuantity,
} from "../../service/cartItemsSlice";
import { toast } from "react-toastify";
import { BadgeIndianRupee } from "lucide-react";

const CartPage = () => {
  const userId = localStorage.getItem("user");
  const cartId = parseInt(localStorage.getItem("cartId"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);

  useEffect(() => {
    if (cartId) {
      dispatch(fetchCartItem(cartId));
    }
    console.log("test", cartItems);
  }, [dispatch]);

  if (!cartItems) {
    return <p>Loading...</p>;
  }

  const handleQuantityChange = (
    event,
    change,
    quantity,
    product,
    cartItemId
  ) => {
    event.preventDefault();
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      dispatch(
        updateCartItemQuantity({
          id: cartItemId,
          cartId: cartId,
          productId: product.id,
          quantity: newQuantity,
        })
      ).then((data) => {
        if (data.payload) {
          // toast.success("Cart updated!");
          dispatch(fetchCartItem(cartId));
        } else {
          toast.error("Failed to update cart");
        }
      });
    }
  };

  const handleRemoveItem = (e, id) => {
    e.preventDefault();
    dispatch(deleteCartItem(id)).then((data) => {
      if (data) {
        dispatch(fetchCartItem(cartId));
        toast.success("Item deleted successfully");
      }
    });
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout");
    navigate("/payment");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      {!cartItems || cartItems.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <>
          <ul className="list-group shadow-sm rounded">
            {cartItems
              .filter((item) => item.product != null)
              .map((item) => (
                <li
                  key={item.product.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      // src={item.product.image}
                      src={`https://localhost:7152/${item.product.imageUrl}`}
                      alt={item.product.name}
                      className="img-thumbnail me-3"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div> 
                      <h5>{item.product.name}</h5>
                      <p className="text-muted mb-0">
                        {/* {item.product.description} */}
                      </p>
                      <p className="fw-bold">₹{item.product.price}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={(e) =>
                        handleQuantityChange(
                          e,
                          -1,
                          item.quantity,
                          item.product,
                          item.id
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <i className="bi bi-dash-lg"> - </i>
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={(e) =>
                        handleQuantityChange(
                          e,
                          1,
                          item.quantity,
                          item.product,
                          item.id
                        )
                      }
                      disabled={item.quantity >= item.product.stock}
                    >
                      <i className="bi bi-plus-lg"> + </i>
                    </button>
                    <button
                      className="btn btn-outline-danger ms-3"
                      onClick={(e) => handleRemoveItem(e, item.id)}
                    >
                      <i className="bi bi-trash"></i> Remove
                    </button>
                  </div>
                </li>
              ))}
          </ul>

          <div className="mt-4 d-flex justify-content-between align-items-center">
            <div
              className="alert alert-warning w-50"
              style={{ fontSize: "1.25rem" }}
            >
              <strong>Total Amount: ₹{calculateTotal()}</strong>
            </div>
            <button
              className="btn btn-success btn-lg px-4 py-2 shadow rounded-pill"
              onClick={handleCheckout}
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <i className="bi bi-cart-check me-2"></i> Proceed to Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
