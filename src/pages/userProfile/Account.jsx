import React, { useState } from "react";
import AccountNavbar from "./Navbar-UserAccount";
import { Route, Routes } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import AddAddressForm from "./AddAddressForm";
import OrderHistory from "./OrderHistory";
import { Offcanvas, Button } from "react-bootstrap";
import { FaUser, FaAddressBook, FaHistory } from "react-icons/fa"; // Importing icons from react-icons

function Account() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  return (
    <>
      {/* Button to toggle Sidebar */}
      <Button variant="dark" onClick={handleSidebarToggle} className="m-3">
        Account Menu
      </Button>

      {/* Offcanvas Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={handleSidebarToggle}
        placement="start"
        className="custom-sidebar"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Account Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="list-group">
            <a
              href="/account/profile"
              className="list-group-item list-group-item-action"
            >
              <FaUser className="me-2" /> Profile Details
            </a>
            <a
              href="/account/address"
              className="list-group-item list-group-item-action"
            >
              <FaAddressBook className="me-2" /> Add Address
            </a>
            <a
              href="/account/orders"
              className="list-group-item list-group-item-action"
            >
              <FaHistory className="me-2" /> Order History
            </a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div>
        <Routes>
          <Route path="profile" element={<ProfileDetails />} />
          <Route path="address" element={<AddAddressForm />} />
          <Route path="orders" element={<OrderHistory />} />
        </Routes>
      </div>
    </>
  );
}

export default Account;
