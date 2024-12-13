import React from "react";
import "./AddAddressForm.css";

const AddressCard = ({
  addressData,
  handleEditAddress,
  onDelete,
  setCurrentSelectedAddress,

  currentSelectedAddress,
}) => {
  const isSelected = currentSelectedAddress?.id === addressData.id;
  const handleCardClick = () => {
    if (setCurrentSelectedAddress) {
      // Toggle selection
      setCurrentSelectedAddress(isSelected ? null : addressData);
    }
  };
  console.log(currentSelectedAddress);
  return (
    <div
      // onClick={
      //   setCurrentSelectedAddress
      //     ? () => setCurrentSelectedAddress(addressData)
      //     : null
      // }
      onClick={handleCardClick}
      className={`card mb-3 ${isSelected ? "selected-address" : ""}`}
      style={{ maxWidth: "400px" }}
      // className={`card mb-3 ${
      //   currentSelectedAddress ? "selected-address" : ""
      // }`}
      // style={{ maxWidth: "400px" }}
    >
      <div className="card-body">
        <h5 className="card-title">Address</h5>
        <p className="card-text">
          <strong>Address:</strong> {addressData.address}
        </p>
        <p className="card-text">
          <strong>City:</strong> {addressData.city}
        </p>
        <p className="card-text">
          <strong>Pincode:</strong> {addressData.pincode}
        </p>
        <p className="card-text">
          <strong>Phone:</strong> {addressData.phone}
        </p>
        <p className="card-text">
          <strong>Notes:</strong> {addressData.notes || "N/A"}
        </p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button
          className="btn btn-dark"
          onClick={() => handleEditAddress(addressData)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(addressData.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
