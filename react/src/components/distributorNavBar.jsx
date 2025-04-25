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

const DistriNavBar = ({
  username = "Distributor",
  email = "admin@distributor.com",
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
            onClick={() => navigate("/Distributor/distributor-Dashboard")}
          />
          <div className="d-flex flex-column text-white">
            <span
              className="fw-semibold"
              role="button"
              onClick={() => navigate("/Distributor/distributor-Dashboard")}
            >
              Welcome, {username}
            </span>
            <small className="text-light">{email}</small>
          </div>
        </div>

        {/* Right section: Nav links */}
        <div className="d-flex gap-4 align-items-center">
         
          <Link
            to="/distributor/notifications"
            className="nav-link position-relative"
            style={{
              ...linkStyle,
              ...(hoveredLink === "notifications" || isActive("/distributor/notifications")
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
            to="/Distributor/assignDevice"
            className="nav-link"
            style={{
              ...linkStyle,
              ...(hoveredLink === "assignDevice" || isActive("/Distributor/assignDevice")
                ? linkHoverStyle
                : {}),
            }}
            onMouseEnter={() => setHoveredLink("assignDevice")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <BsClipboardCheck /> Assign Devices
          </Link>

          <Link
            to="/Distributor/reports"
            className="nav-link"
            style={{
              ...linkStyle,
              ...(hoveredLink === "reports" || isActive("/Distributor/reports")
                ? linkHoverStyle
                : {}),
            }}
            onMouseEnter={() => setHoveredLink("reports")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <BsClipboardCheck /> Generate Report
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

export default DistriNavBar;
