import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BsBoxArrowRight, BsBell, BsLaptop, BsClipboardCheck } from "react-icons/bs";

const AdminNavbar = ({ username = "Admin", email = "admin@example.com", notifications = 0 }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin/login");
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light p-3 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span
          className="navbar-brand text-primary fw-semibold"
          role="button"
          onClick={() => navigate("/admin/dashboard")}
        >
          Welcome, {username}
        </span>

        <span className="text-muted me-4">{email}</span>

        <div className="d-flex gap-4">
          <Link to="/admin/notifications" className="nav-link custom-link">
            <BsBell className="me-1" /> Notifications ({notifications})
          </Link>

          <Link to="/admin/applications" className="nav-link custom-link">
            <BsLaptop className="me-1" /> Applications
          </Link>

          <Link to="/admin/students" className="nav-link custom-link">
            <BsClipboardCheck className="me-1" /> Students
          </Link>

          <span
            className="nav-link custom-link text-danger"
            role="button"
            onClick={handleLogout}
          >
            <BsBoxArrowRight className="me-1" /> Logout
          </span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
