import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../service/orderSlice";

function SellerDashboard() {
  const { salesList } = useSelector((state) => state.order);
  const sellerId = parseInt(localStorage.userId);
  const dispatch = useDispatch();
  console.log(salesList);
  useEffect(() => {
    dispatch(fetchSales({ sellerId }));
  }, [dispatch, sellerId]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Seller Dashboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Total Quantity Sold</th>
            <th>Total Sales Revenue</th>
            <th>Total Orders</th>
          </tr>
        </thead>
        <tbody>
          {salesList && salesList.length > 0 ? (
            salesList.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>${item.productPrice.toFixed(2)}</td>
                <td>{item.totalQuantitySold}</td>
                <td>${item.totalSalesRevenue.toFixed(2)}</td>
                <td>{item.totalOrders}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No sales data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SellerDashboard;
