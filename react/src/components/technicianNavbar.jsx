import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  BsBoxArrowRight,
  BsBell,
  BsClipboardCheck,
  BsLaptop,
  BsPersonCircle,
} from "react-icons/bs";

const linkStyle = {
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  transition: "color 0.3s",
};

const linkHoverStyle = {
  color: "#ffc107",
};

const TechNavBar = ({
  username = "Technician",
  email = "tech@example.com",
  notifications = 0,
  onStatusCheck,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = React.useState(null);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/student/login");
      }
    });
  };

  // Utility to highlight active tab
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left section: Username + email */}
        <div className="d-flex align-items-center gap-3">
          <BsPersonCircle
            className="text-white fs-3"
            role="button"
            onClick={() => navigate("/technician/dashboard")}
          />
          <div className="d-flex flex-column text-white">
            <span
              className="fw-semibold"
              role="button"
              onClick={() => navigate("/technician/dashboard")}
            >
              Welcome, {username}
            </span>
            <small className="text-light">{email}</small>
          </div>
        </div>

        {/* Right section: Nav links */}
        <div className="d-flex gap-4 align-items-center">
          <Link
            to="/technician/viewDevices"
            className="nav-link"
            style={{
              ...linkStyle,
              ...(hoveredLink === "devices" || isActive("/technician/viewDevices")
                ? linkHoverStyle
                : {}),
            }}
            onMouseEnter={() => setHoveredLink("devices")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <BsLaptop /> Devices
          </Link>

          <Link
            to="/technician/notifications"
            className="nav-link position-relative"
            style={{
              ...linkStyle,
              ...(hoveredLink === "notifications" || isActive("/technician/notifications")
                ? linkHoverStyle
                : {}),
            }}
            onMouseEnter={() => setHoveredLink("notifications")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <BsBell /> Notifications
            {notifications > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {notifications}
              </span>
            )}
          </Link>

          <Link
            to="/technician/registerNewDevice"
            onClick={onStatusCheck}
            className="nav-link"
            style={{
              ...linkStyle,
              ...(hoveredLink === "register" || isActive("/technician/registerNewDevice")
                ? linkHoverStyle
                : {}),
            }}
            onMouseEnter={() => setHoveredLink("register")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <BsClipboardCheck /> Register Device
          </Link>

          <span
            className="nav-link fw-bold"
            role="button"
            onClick={handleLogout}
            style={{
              ...linkStyle,
              color: "#ff4d4f",
              ...(hoveredLink === "logout" ? { color: "#d32f2f" } : {}),
            }}
            onMouseEnter={() => setHoveredLink("logout")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <BsBoxArrowRight /> Logout
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TechNavBar;
