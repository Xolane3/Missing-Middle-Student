import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2"; // <-- Make sure SweetAlert2 is installed
import { BsBoxArrowRight, BsBell, BsClipboardCheck,BsLaptop } from "react-icons/bs";


const TechNavBar = ({ username = "Technician", email = "tech@example.com", notifications = 0, onStatusCheck }) => {
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
        navigate("/student/login");
      }
    });
  };

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
          <Link to="/technician/viewDevices" className="nav-link custom-link">
            <BsLaptop className="me-1" /> View Devices
          </Link>

          <Link to="/technician/notifications" className="nav-link custom-link">
            <BsBell className="me-1" /> Notifications ({notifications})
          </Link>

          <Link to="/technician/registerNewDevice" className="nav-link custom-link" onClick={onStatusCheck}>
            <BsClipboardCheck className="me-1" /> Register New Device
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

export default TechNavBar;
