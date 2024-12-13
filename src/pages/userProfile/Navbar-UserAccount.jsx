import React from "react";
import { Link } from "react-router-dom";
import "./Account.css";

const AccountNavbar = () => {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-xol rounded-lg border bg-background p-6 shadow-sm">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                <Link to="orders">Orders</Link>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                <Link to="address">Address</Link>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="settings-tab"
                data-bs-toggle="tab"
                data-bs-target="#settings"
                type="button"
                role="tab"
                aria-controls="settings"
                aria-selected="false"
              >
                <Link to="profile">Profile</Link>
              </button>
            </li>
          </ul>

          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
            </div>
            <div
              class="tab-pane fade"
              id="settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
