import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../service/userSlice";
import logo from "../../assests/quitqlogo.png";
import "./Navbar.css";
import { LogOut } from "lucide-react";
import { Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

const Navbar = ({ cartSize }) => {
  const { user } = useSelector((state) => state.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-2">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand ms-0" to="/">
          <img
            src={logo}
            alt="Site Logo"
            className="d-inline-block align-text-top"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
          aria-controls="navbarNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Collapse in={open}>
          <div className="collapse navbar-collapse" id="navbarNav">
            
            <ul className="navbar-nav me-auto">
              {!user && !storedUser ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/clothing">
                      Fashion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/electronics">
                      Electronics
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/groceries">
                      Grocery
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav ms-auto align-items-center">
              {storedUser && (
                <>
                  <li className="nav-item me-3">
                    <form className="d-flex">
                      <button
                        onClick={handleSearch}
                        className="btn btn-light"
                        type="button"
                      >
                        Search
                      </button>
                    </form>
                  </li>
                  <li className="nav-item me-3">
                    <Link className="nav-link" to="/account">
                      Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <button className="btn btn-primary">
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          style={{ fontSize: "20px" }}
                          className="me-1"
                        />
                        ({cartSize})
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Button onClick={handleLogout}>
                      <LogOut />
                      Logout
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Collapse>
      </div>
    </nav>
  );
};

export default Navbar;
