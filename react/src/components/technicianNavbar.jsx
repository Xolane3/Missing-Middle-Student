import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsBoxArrowRight, BsBell, BsLaptop, BsClipboardCheck } from "react-icons/bs";

const TechNavBar = ({ username, email, notifications, onStatusCheck }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-light p-3 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span
          className="navbar-brand text-primary fw-semibold"
          role="button"
          onClick={() => navigate("/technician/dashboard")}
        >
          Welcome, {username}
        </span>

        <span className="text-muted me-4">{email}</span>

        <div className="d-flex gap-4">
          <Link to="/technician/notifications" className="nav-link custom-link">
            <BsBell className="me-1" /> Notifications ({notifications})
          </Link>

        

          <Link to="/technician/registerNewDevice" className="nav-link custom-link" onClick={onStatusCheck}>
            <BsClipboardCheck className="me-1" /> Register New device
          </Link>

          <Link to="/student/login" className="nav-link custom-link text-danger">
            <BsBoxArrowRight className="me-1" /> Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TechNavBar;
