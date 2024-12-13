import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../service/userSlice";
import "./Registration.css";
import { toast } from "react-toastify";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    contactNumber: "",
    password: "",
    email: "",
    role: "customer", // Default role
  });

  const [errors, setErrors] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the field as user types
    const fieldError = validateField(name, value);
    setErrors({ ...errors, [name]: fieldError });
  };
const validateField = (name, value) => {
  switch (name) {
    case "firstName":
      return value ? "" : "First name is required.";
    case "lastName":
      return value ? "" : "Last name is required.";
    case "userName":
      return value ? "" : "Username is required.";
    case "contactNumber":
      const phoneRegex = /^\d{10}$/;
      return value
        ? phoneRegex.test(value)
          ? ""
          : "Contact number must be 10 digits."
        : "Contact number is required.";
    case "password":
      const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
      return value
        ? passwordRegex.test(value)
          ? ""
          : "Password must be at least 8 characters long, include one uppercase letter, and one special character."
        : "Password is required.";
    case "email":
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      return value
        ? emailRegex.test(value)
          ? ""
          : "Email must be a valid @gmail.com address."
        : "Email is required.";
    default:
      return "";
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(registerUser(formData)).then((result) => {
        if (result.payload.status === "Success") {
          setFormData({
            firstName: "",
            lastName: "",
            userName: "",
            contactNumber: "",
            password: "",
            email: "",
            role: "customer",
          });
          navigate("/login");
        } else {
          toast.error(result.payload.message);
        }
      });
    }
  };

const validate = () => {
  const newErrors = {};
  newErrors.firstName = validateField("firstName", formData.firstName);
  newErrors.lastName = validateField("lastName", formData.lastName);
  newErrors.userName = validateField("userName", formData.userName);
  newErrors.contactNumber = validateField(
    "contactNumber",
    formData.contactNumber
  );
  newErrors.password = validateField("password", formData.password);
  newErrors.email = validateField("email", formData.email);

  // Filter out empty error messages
  Object.keys(newErrors).forEach(
    (key) => !newErrors[key] && delete newErrors[key]
  );

  return newErrors;
};

  return (
    <div className="registration-page">
      <div className=" d-flex justify-content-center align-items-center vh-100">
        <div className="registration-card p-4">
          <h2 className="text-center mb-4" style={{ color: "#273b51" }}>
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label htmlFor="firstName" className="form-label">
                First Name
              </label> */}
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control form-control-lg"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="mb-3">
              {/* <label htmlFor="lastName" className="form-label">
                Last Name
              </label> */}
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control form-control-lg"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
            <div className="mb-3">
              {/* <label htmlFor="userName" className="form-label">
                Username
              </label> */}
              <input
                type="text"
                id="userName"
                name="userName"
                className="form-control form-control-lg"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <span className="error">{errors.userName}</span>
              )}
            </div>
            <div className="mb-3">
              {/* <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label> */}
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="form-control form-control-lg"
                placeholder="Contact number"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              {errors.contactNumber && (
                <span className="error">{errors.contactNumber}</span>
              )}
            </div>
            <div className="mb-3">
              {/* <label htmlFor="password" className="form-label">
                Password
              </label> */}
              <input
                type="password"
                id="password"
                name="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="mb-3">
              {/* <label htmlFor="email" className="form-label">
                Email
              </label> */}
              <input
                type="email"
                id="email"
                name="email"
                className="form-control form-control-lg"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Choose Role</label>
              <select
                id="role"
                name="role"
                className="select-control-lg"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
                
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-lg w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <div className="text-danger mt-3">{error.message}</div>}
          </form>
          <div className="text-center mt-4">
            <p className="mb-2">Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline-dark btn-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
