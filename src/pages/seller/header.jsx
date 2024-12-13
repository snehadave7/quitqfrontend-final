import React, { useState } from "react";
import { AlignJustify } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from "react-bootstrap";
import { logout } from "../../service/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./header.css";
function SellerHeader({ setOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    setOpen(true);
  };

  return (
    <header className="seller-header d-flex align-items-center justify-content-between px-3 py-2 ">
      <button onClick={toggleMenu} className="d-lg-none d-block btn btn-dark">
        <AlignJustify />
        <span className={`visually-hidden ${isCollapsed ? "text-dark" : ""}`}>
          Toggle Menu
        </span>
      </button>
      <div className="d-flex flex-grow-1 justify-content-end">
        <button onClick={handleLogout} className="btn btn-dark">
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
}

export default SellerHeader;
