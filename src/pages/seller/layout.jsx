import { useState } from "react";
import SellerHeader from "./header";
import SellerSidebar from "./sidebar";
import { Outlet } from "react-router-dom";

function SellerLayout() {
  const [openSideBar,setOpenSideBar]=useState(false);
  return (
    <div className="d-flex min-vh-100">
      <SellerSidebar open={openSideBar} setOpen={setOpenSideBar} />
      <div className="d-flex flex-column w-100">
        <SellerHeader setOpen={setOpenSideBar} />
        <main className="flex-grow-1 flex-column bg-muted p-4 p-md-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SellerLayout;
