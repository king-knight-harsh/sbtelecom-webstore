import React from "react";
import "./topbar.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">AdminDashboard</span>
        </div>
        <div className="topRight">
          <img src="https://cdn.iconscout.com/icon/free/png-256/user-avatar-contact-portfolio-personal-portrait-profile-5093.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
