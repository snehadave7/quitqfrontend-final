import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  EditAddress,
  fetchAllAddress,
} from "../../service/addressSlice";
import AddressCard from "./AddressCard";
import { toast } from "react-toastify";

const initialState = {
  addresses: [
    {
      address: "",
      city: "",
      pincode: "",
      phone: "",
      notes: "",
    },
  ],
};

const AddAddressForm = ({ setCurrentSelectedAddress,currentSelectedAddress }) => {
  const dispatch = useDispatch();
  const userId = localStorage.userId;
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(fetchAllAddress(userId));
  }, [dispatch]);

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormData({ ...formData, [field]: value });
    const newErrors = validate();
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.pincode) newErrors.pincode = "Pincode is required.";
    if (!formData.phone) {
      newErrors.phone = "Phone is required.";
    } else {
      const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Phone must be a valid 10-digit number.";
      }
    }
    return newErrors;
  };

  const handleManageAddress = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (addressList.length >= 3 && currentEditedId === null) {
        setFormData(initialState);
        toast.error("You can add max 3 addresses");
        return;
      }
      currentEditedId != null
        ? dispatch(EditAddress({ addressId: currentEditedId, formData })).then(
            (data) => {
              if (data.payload) {
                dispatch(fetchAllAddress(userId));
                setCurrentEditedId(null);
                setFormData(initialState);
                toast.success("Address updated successfully");
              }
            }
          )
        : dispatch(
            addNewAddress({
              addresses: {
                id: 0,
                userId: parseInt(userId),
                address: formData.address,
                city: formData.city,
                pincode: formData.pincode,
                phone: formData.phone,
                notes: formData.notes,
              },
              userId: userId,
            })
          ).then((data) => {
            dispatch(fetchAllAddress(userId));
            setFormData(initialState);
            toast.success("Address added successfully");
          });
    }
  };

  const handleEditAddress = (addressData) => {
    setCurrentEditedId(addressData.id);
    setFormData({
      ...formData,
      id: addressData.id,
      userId: parseInt(userId),
      address: addressData?.address,
      city: addressData?.city,
      pincode: addressData?.pincode,
      phone: addressData?.phone,
      notes: addressData?.notes,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id)).then((data) => {
      if (data) {
        dispatch(fetchAllAddress(userId));
        toast.success("Address deleted successfully");
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-5">
          <div className="address-list">
            {addressList && addressList.length > 0
              ? addressList.map((singleAddItem) => (
                  <AddressCard
                    key={singleAddItem.id}
                    addressData={singleAddItem}
                    handleEditAddress={handleEditAddress}
                    onDelete={handleDelete}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    isSelected={selectedAddress?.id === singleAddItem.id}
                    currentSelectedAddress={currentSelectedAddress}
                  />
                ))
              : null}
          </div>
        </div>
        <div className="col-12 col-md-7">
          <div className="address-form-container">
            <h3>
              {currentEditedId != null ? "Edit Address" : "Add New Address"}
            </h3>
            <form onSubmit={handleManageAddress}>
              <div className="form-group mb-3">
                {/* <label htmlFor="address">Address</label> */}
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  placeholder="Enter Address"
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange(e, "address")}
                />
                {errors.address && (
                  <small className="text-danger">{errors.address}</small>
                )}
              </div>

              <div className="form-group mb-3">
                {/* <label htmlFor="city">City</label> */}
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  placeholder="Enter City"
                  value={formData.city || ""}
                  onChange={(e) => handleInputChange(e, "city")}
                />
                {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                )}
              </div>

              <div className="form-group mb-3">
                {/* <label htmlFor="pincode">Pincode</label> */}
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  className="form-control"
                  placeholder="Enter Pincode"
                  value={formData.pincode || ""}
                  onChange={(e) => handleInputChange(e, "pincode")}
                />
                {errors.pincode && (
                  <small className="text-danger">{errors.pincode}</small>
                )}
              </div>

              <div className="form-group mb-3">
                {/* <label htmlFor="phone">Phone</label> */}
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange(e, "phone")}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>

              <div className="form-group mb-3">
                {/* <label htmlFor="notes">Notes</label> */}
                <textarea
                  name="notes"
                  id="notes"
                  className="form-control"
                  placeholder="Enter Notes (Optional)"
                  value={formData.notes || ""}
                  onChange={(e) => handleInputChange(e, "notes")}
                />
              </div>

              <button type="submit" className="btn btn-dark">
                {currentEditedId != null ? "Edit Address" : "Add Address"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressForm;



