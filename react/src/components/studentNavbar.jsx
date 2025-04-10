// NavBar.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ username, email, notifications,onStatusCheck }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-light p-3">
      <div className="container-fluid">
        <span  className="navbar-brand cursor-pointer"  onClick={() => navigate("/student/dashboard")}>
          Welcome, {username}
        </span>
        <span className="navbar-text mx-3">
          {email}
        </span>
        <button className="btn btn-primary mx-2" onClick={() => navigate("/student/notification")}>
          Notifications ({notifications})
        </button>
        <button className="btn btn-success mx-2" onClick={() => navigate("/student/apply-laptop")}>
          Apply for Laptop
        </button>
        <button className="btn btn-info mx-2" onClick={onStatusCheck}>
          Application Status
        </button>
        <button className="btn btn-danger mx-2" onClick={() => navigate("/student/login")}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
