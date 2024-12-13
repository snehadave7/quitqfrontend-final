import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllOrdersForSeller,
  UpdateOrderStatus,
} from "../../service/orderSlice";
import { toast } from "react-toastify";

function SellerOrderDetailsView({ order, payment }) {
  const initialFormData = {
    status: order.orderStatus || "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const sellerId = parseInt(localStorage.userId);
  async function handleUpdateStatus(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const updateOrderData = {
      ...order,
      orderStatus: formData.status,
    };
    console.log(updateOrderData);
    await dispatch(UpdateOrderStatus({ orderData: updateOrderData }));
    dispatch(fetchAllOrdersForSeller({ sellerId }));
    toast.success("Status updated");
    setIsSubmitting(false);
  }

  return (
    <>
      <button
        onClick={() => setOpenDetailsDialog(true)}
        className="btn btn-dark"
      >
        View Details
      </button>

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
                    <span>{order.id}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Order Date</p>
                    <span>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Quantity</p>
                    <span>{order.quantity}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Order Price</p>
                    <span>{order.quantity * order.product.price}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fw-medium">Order Status</p>
                    <span>{order.orderStatus}</span>
                  </div>
                </div>
              </div>

              <hr />

              <div className="row g-3">
                <div className="col-12">
                  <div className="fw-medium">Payment Details</div>
                  <ul className="list-unstyled">
                    <li className="d-flex justify-content-between">
                      <span>{payment.status}</span>
                      <span>{payment.mode}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr />

              <div className="row g-3">
                <div className="col-12">
                  <div className="fw-medium">Shipping Info</div>
                  <div className="text-muted">
                    <p>
                      {order.user.firstName} {order.user.lastName}
                    </p>
                    <p>{order.address.address}</p>
                    <p>{order.address.city}</p>
                    <p>{order.address.pincode}</p>
                    <p>{order.address.phone}</p>
                    <p>{order.address.notes}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateStatus}>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Order Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setOpenDetailsDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerOrderDetailsView;
