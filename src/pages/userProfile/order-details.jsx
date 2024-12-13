import { useState } from "react";

function ShoppingOrderDetailsView({ order }) {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenDetailsDialog(true)}
        className="btn btn-dark btn-sm"
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
        <div className="modal-dialog modal-lg modal-dialog-centered">
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
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between mb-3">
                    <p className="fw-bold">Order ID:</p>
                    <span>{order.id}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="fw-bold">Order Date:</p>
                    <span>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="fw-bold">Quantity:</p>
                    <span>{order.quantity}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="fw-bold">Order Price:</p>
                    <span>${order.quantity * order.product.price}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="fw-bold">Order Status:</p>
                    <span>{order.orderStatus}</span>
                  </div>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-12">
                  <h5>Order Items</h5>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>{order.product.name}</span>
                      <span>${order.product.price}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-12">
                  <h5>Shipping Information</h5>
                  <div>
                    <p className="fw-bold">
                      {order.user.firstName} {order.user.lastName}
                    </p>
                    <p>{order.address.address}</p>
                    <p>
                      {order.address.city}, {order.address.pincode}
                    </p>
                    <p>{order.address.phone}</p>
                    <p>{order.address.notes}</p>
                  </div>
                </div>
              </div>
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

export default ShoppingOrderDetailsView;
