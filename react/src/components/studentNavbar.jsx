import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";  // Make sure to import the CSS for hover effects

const NavBar = ({ username, email, notifications, onStatusCheck }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-light p-3">
      <div className="container-fluid">
        <span className="navbar-brand cursor-pointer" onClick={() => navigate("/student/dashboard")}>
          Welcome, {username}
        </span>
        <span className="navbar-text mx-3">{email}</span>

        <div className="nav-links">
          <Link to="/student/notification" className="nav-link">
            Notifications ({notifications})
          </Link>
          <Link to="/student/apply-laptop" className="nav-link">
            Apply for Laptop
          </Link>
          <Link to="/student/status" className="nav-link" onClick={onStatusCheck}>
            Application Status
          </Link>
          <Link to="/student/login" className="nav-link logout-link">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
