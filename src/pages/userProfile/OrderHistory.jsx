import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersForUser } from "../../service/orderSlice";
import ShoppingOrderDetailsView from "./order-details";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orderList, isLoading } = useSelector((state) => state.order);
  const userId = parseInt(localStorage.userId);

  useEffect(() => {
    dispatch(fetchAllOrdersForUser({ userId }));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="card mt-4">
      <div className="card-header bg-dark text-white">Order History</div>
      <div className="card-body">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Price</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <tr key={order.id}>
                  <td>{order.product.name}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${getStatusClass(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>₹{order.quantity * order.product.price}</td>
                  <td>
                    <ShoppingOrderDetailsView order={order} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "delivered":
      return "bg-success text-white"; 
    case "rejected":
      return "bg-danger text-white"; 
    case "InProcess":
      return "bg-warning text-dark";
    case "InShipping":
      return "bg-info text-white"; 
    default:
      return "bg-secondary text-white"; 
  }
};

export default OrderHistory;

                    