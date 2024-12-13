import { AlignJustify } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from "react-bootstrap";
import { logout } from "../../service/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./admin-header.css";
function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <header className="admin-header d-flex align-items-center justify-content-between px-3 py-2">
      <button onClick={() => setOpen(true)} className="d-lg-none d-block btn btn-dark">
        <AlignJustify />
        <span className="visually-hidden ">Toggle Menu</span>
      </button>
      <div className="d-flex flex-grow-1 justify-content-end">
        <button className=" btn btn-dark" onClick={handleLogout}>
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
