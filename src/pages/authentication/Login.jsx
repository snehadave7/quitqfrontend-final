import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../service/userSlice";
import { toast } from "react-toastify";



const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { loading, error, user } = useSelector((state) => state.user);
  const role = localStorage.role;
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
const handleChange = (e) => {
  const { name, value } = e.target;
  setCredentials({ ...credentials, [name]: value });

  const fieldError = validateField(name, value);
  setErrors({ ...errors, [name]: fieldError });
};
  const validateField = (name, value) => {
  switch (name) {
    case "username":
      return value ? "" : "Username is required.";
    case "password":
      return value ? "" : "Password is required.";
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
    dispatch(loginUser(credentials)).then((result) => {
      if (result.payload) {
        console.log("login success");
        setCredentials({
          username: "",
          password: "",
        });
      }
      else{
        toast.error("Wrong credentials")
      }
    });
  }
  };
   const validate = () => {
     const newErrors = {};
     newErrors.username = validateField("username", credentials.username);
     newErrors.password = validateField("password", credentials.password);

     // Remove empty error messages
     Object.keys(newErrors).forEach(
       (key) => !newErrors[key] && delete newErrors[key]
     );

     return newErrors;
   };


  useEffect(() => {
    if (user) {
      if (role === "customer") navigate("/");
      else if (role === "seller") navigate("/seller/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="login-page">
      <div className=" d-flex justify-content-center align-items-center vh-100">
        <div className="login-card p-4">
          <h2 className="text-center mb-4 " style={{ color: "#273b51" }}>
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label htmlFor="username" className="form-label">
                Username
              </label> */}
              <input
                type="text"
                id="username"
                name="username"
                className="form-control form-control-lg"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleChange}
                
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
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
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-dark btn-lg w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <div className="text-danger mt-3">{error.message}</div>}
          </form>
          <div className="text-center mt-4">
            <p className="mb-2">Don’t have an account?</p>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-outline-dark btn-lg"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
