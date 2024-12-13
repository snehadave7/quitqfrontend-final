import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  PanelTopOpen,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { Offcanvas } from "react-bootstrap";
const sellerSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/seller/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/seller/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/seller/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({setOpen}) {
  const navigate = useNavigate();

  return (
    <nav className="mt-4 d-flex flex-column gap-2">
      {sellerSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() =>{ navigate(menuItem.path);
          setOpen(false);
          }}
          className="d-flex align-items-center gap-2 rounded px-3 py-2 text-secondary menu-item"
          style={{ cursor: "pointer" }} // To make the div appear clickable
        >
          {menuItem.icon}
          <span className="fs-5">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function SellerSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      
      <Offcanvas
        show={open}
        onHide={() => setOpen(false)}
        placement="start"
        className="w-50 offcanvas-custom"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="d-flex align-items-center gap-2">
            <ChartNoAxesCombined size={30} />
            Seller Panel
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column h-100">
          <MenuItems setOpen={setOpen} />
        </Offcanvas.Body>
      </Offcanvas>

      <aside className="d-none d-lg-flex flex-column w-24 border-end sidebar-custom p-3">
        <div
          onClick={() => navigate("/seller/dashboard")}
          className="sidebar-heading d-flex align-items-center gap-2 mb-3"
          style={{ cursor: "pointer" }}
        >
          <PanelTopOpen size={28} />
          {/* <ChartNoAxesCombined size={30} /> */}
          <h5 className="fw-bold m-0">Seller Panel</h5>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default SellerSidebar;
