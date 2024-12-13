import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersForSeller } from "../../service/orderSlice";
// import ShoppingOrderDetailsView from "../pages/userProfile/order-details";
import SellerOrderDetailsView from "./seller-order-details";

function SellerOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {orderList}=useSelector(state=>state.order);
  const dispatch=useDispatch();
  const sellerId=parseInt(localStorage.userId);

  useEffect(()=>{
    console.log("useEffect",sellerId)
    dispatch(fetchAllOrdersForSeller({ sellerId }));
  },[dispatch])

  // console.log("orderList",orderList);
  return (
    <div className="card">
      <div className="card-header">All Orders</div>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Order Date</th>
              <th scope="col">Order Status</th>
              <th scope="col">Order Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

            {orderList && orderList.length > 0
              ? orderList.map((item) => (
                  <tr key={item.order.id}>
                    <th scope="row"> {item.order.product.name}</th>
                    <td>
                      {new Date(item.order.orderDate).toLocaleDateString()}
                    </td>
                    <td>{item.order.orderStatus}</td>
                    <td>${item.order.quantity * item.order.product.price}</td>
                    <td>
                      <SellerOrderDetailsView order={item.order} payment={item} />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        <div
          className={`modal fade ${openDetailsDialog ? "show" : ""}`}
          tabIndex="-1"
          style={{ display: openDetailsDialog ? "block" : "none" }}
          aria-labelledby="orderDetailsModalLabel"
          aria-hidden={!openDetailsDialog}
        >
          <div className="modal-dialog" style={{ maxWidth: "600px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderDetailsModalLabel">
                  Order Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOpenDetailsDialog(false)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex justify-content-between">
                      <p className="fw-medium">Order ID</p>
                      <span>123456</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fw-medium">Order Date</p>
                      <span>27/12/12</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fw-medium">Order Price</p>
                      <span>$100</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="fw-medium">Order Status</p>
                      <span>In process</span>
                    </div>
                  </div>
                </div>

                <hr />

               
                <div className="row g-3">
                  <div className="col-12">
                    <div className="fw-medium">Order Details</div>
                    <ul className="list-unstyled">
                      <li className="d-flex justify-content-between">
                        <span>Product One</span>
                        <span>$100</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <hr />

                
                <div className="row g-3">
                  <div className="col-12">
                    <div className="fw-medium">Shipping Info</div>
                    <div className="text-muted">
                      <p>Name</p>
                      <p>Address</p>
                      <p>City</p>
                      <p>Pincode</p>
                      <p>Phone</p>
                      <p>Notes</p>
                    </div>
                  </div>
                </div>

                
                <form>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Order Status
                    </label>
                    <select
                      id="status"
                      className="form-select"
                      onChange={(e) => {}}
                    >
                      <option value="pending">Pending</option>
                      <option value="InProcess">In Process</option>
                      <option value="InShipping">In Shipping</option>
                      <option value="rejected">Rejected</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  
                  <button type="submit" className="btn btn-dark">
                    Update Order Status
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerOrders;

