import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileDetails = () => {
  // State to manage user data, editing state, and form data
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    userName: "",
    contactNumber: "",
    email: "",
    role: "",
    password: "", 
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      axios
        .get(`https://localhost:7152/api/Users/${localStorage.userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setFormData(response.data); 
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      console.log("No token found");
    }
  }, []);

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSave(e) {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(
      `https://localhost:7152/api/Users/${localStorage.userId}`,
      {
        id: parseInt(localStorage.userId),
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,
        role: localStorage.role,
      },
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-lg rounded">
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={handleSave}>
                  <h4 className="mb-4 text-center">Edit Profile</h4>

                  
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      className="form-control"
                      value={formData.userName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      className="form-control"
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-dark w-100">
                    Save Changes
                  </button>
                </form>
              ) : (
                <>
                  <h4 className="mb-4 text-center">User Details</h4>

                  
                  <p>
                    <strong>First Name:</strong> {user?.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {user?.lastName}
                  </p>
                  <p>
                    <strong>Username:</strong> {user?.userName}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {user?.contactNumber}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user?.role}
                  </p>

                 
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-secondary w-100 mt-3"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
