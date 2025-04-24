import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BsBoxArrowRight,
  BsBell,
  BsLaptop,
  BsClipboardCheck,
  BsPersonCircle,
  BsHouse
} from "react-icons/bs";

const NavBar = ({ username, email, notifications, onStatusCheck, profilePic }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-light p-3 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Left Side: Profile and Home Icon */}
        <div className="d-flex align-items-center gap-4">
          <Link
            to="/student/profile"
            className="navbar-brand text-primary fw-semibold text-decoration-none d-flex align-items-center gap-3"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="rounded-circle border"
                style={{
                  width: 36,
                  height: 36,
                  objectFit: "cover",
                  marginRight: 8,
                }}
              />
            ) : (
              <BsPersonCircle size={24} className="me-2" />
            )}
            <span>Welcome, {username}</span>
          </Link>

          <Link
            to="/student/dashboard"
            className="nav-link text-dark d-flex align-items-center"
            title="Home"
          >
            <BsHouse size={20} />
          </Link>
        </div>

        {/* Middle: Email */}
        <span className="text-muted me-4">{email}</span>

        {/* Right Side: Nav Controls */}
        <div className="d-flex gap-4">
          <Link to="/student/notifications" className="nav-link custom-link">
            <BsBell className="me-1" /> Notifications ({notifications})
          </Link>

          <Link to="/student/apply-laptop" className="nav-link custom-link">
            <BsLaptop className="me-1" /> Apply for Laptop
          </Link>

          <Link
            to="/student/application-status"
            className="nav-link custom-link"
            onClick={onStatusCheck}
          >
            <BsClipboardCheck className="me-1" /> Application Status
          </Link>

          <Link to="/student/login" className="nav-link custom-link text-danger">
            <BsBoxArrowRight className="me-1" /> Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
