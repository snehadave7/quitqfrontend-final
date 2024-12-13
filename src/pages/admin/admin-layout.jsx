import { useState } from "react";
import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="d-flex min-vh-100">
      <AdminSidebar open={openSideBar} setOpen={setOpenSideBar} />
      <div className="d-flex flex-column w-100">
        <AdminHeader setOpen={setOpenSideBar} />
        <main className="flex-grow-1 flex-column bg-muted p-4 p-md-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
