import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import {
  BsBoxArrowRight,
  BsBell,
  BsLaptop,
  BsClipboardCheck,
  BsPersonCircle,
} from "react-icons/bs";

// Styles
const linkStyle = {
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  transition: "color 0.3s",
};
const linkHoverStyle = { color: "#ffc107" };

const AdminNavbar = ({
  username = "Admin01",
  email = "admin@example.com",
  notifications = 0,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  const [bsModal, setBsModal] = useState(null);
  const [editable, setEditable] = useState(false);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/120");
  const [formData, setFormData] = useState({
    firstName: "Felecia",
    lastName: "Burke",
    email: "example@mail.com",
    day: "10",
    month: "June",
    year: "1990",
    gender: "Female",
  });

  useEffect(() => {
    if (modalRef.current) {
      const modalInstance = new Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      setBsModal(modalInstance);
    }
  }, []);

  const openModal = () => bsModal?.show();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

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
      if (result.isConfirmed) navigate("/admin/login");
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm px-4 py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left: Profile Trigger */}
          <div className="d-flex align-items-center gap-3">
            <BsPersonCircle
              className="text-white fs-3"
              role="button"
              onClick={openModal}
              aria-label="Open account details"
            />
            <Link
              to="/admin/dashboard"
              className="d-flex flex-column text-white text-decoration-none gap-1"
            >
              <span className="fw-semibold">Welcome, {username}</span>
              <small>{email}</small>
            </Link>
          </div>

          {/* Right: Navigation Links */}
          <div className="d-flex gap-4 align-items-center">
            {/* Regular Links */}
            <Link
              to="/admin/notifications"
              className="nav-link"
              style={{
                ...linkStyle,
                ...(hoveredLink === "notifications" || isActive("/admin/notifications")
                  ? linkHoverStyle
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("notifications")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <BsBell /> Notifications ({notifications})
            </Link>

            <Link
              to="/admin/applications"
              className="nav-link"
              style={{
                ...linkStyle,
                ...(hoveredLink === "applications" || isActive("/admin/applications")
                  ? linkHoverStyle
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("applications")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <BsLaptop /> Applications
            </Link>

            {/* Dropdown for Register */}
            <div
              className="position-relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span
                className="nav-link"
                style={{
                  ...linkStyle,
                  ...(dropdownOpen ? linkHoverStyle : {}),
                }}
              >
                Register
              </span>
              {dropdownOpen && (
                <div
                  className="position-absolute bg-white rounded shadow-sm mt-1"
                  style={{ zIndex: 1000, minWidth: "200px" }}
                >
                  <Link
                    to="/onestop/register-student"
                    className="dropdown-item text-dark"
                  >
                    Register Student
                  </Link>
                  <Link
                    to="/onestop/register-technician"
                    className="dropdown-item text-dark"
                  >
                    Register Technician
                  </Link>
                  <Link
                    to="/onestop/register-financial"
                    className="dropdown-item text-dark"
                  >
                    Register Financial Aid Officer
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/admin/students"
              className="nav-link"
              style={{
                ...linkStyle,
                ...(hoveredLink === "students" || isActive("/admin/students")
                  ? linkHoverStyle
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("students")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <BsClipboardCheck /> Students
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

      {/* Profile Modal */}
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="accountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="accountModalLabel">
                Account Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex gap-4">
                {/* Profile Picture */}
                <div className="text-center">
                  <img
                    src={profilePic}
                    alt="User"
                    className="rounded-circle mb-2"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                    onClick={triggerFileInput}
                    title="Click to change photo"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    hidden
                  />
                  <small className="d-block text-muted">Click image to change</small>
                </div>

                {/* Profile Form */}
                <div className="flex-grow-1">
                  <form>
                    {["firstName", "lastName", "email"].map((field, index) => (
                      <div className="mb-3" key={index}>
                        <label className="form-label">
                          {field === "firstName"
                            ? "First Name"
                            : field === "lastName"
                            ? "Last Name"
                            : "E-mail"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          className="form-control"
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          disabled={!editable}
                        />
                      </div>
                    ))}

                    <div className="mb-3 row">
                      <div className="col">
                        <label className="form-label">Date of Birth</label>
                        <div className="d-flex gap-2">
                          <select
                            className="form-select"
                            name="day"
                            value={formData.day}
                            onChange={handleChange}
                            disabled={!editable}
                          >
                            {[...Array(31)].map((_, i) => (
                              <option key={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                          <select
                            className="form-select"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            disabled={!editable}
                          >
                            {[
                              "January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December",
                            ].map((month) => (
                              <option key={month}>{month}</option>
                            ))}
                          </select>
                          <select
                            className="form-select"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            disabled={!editable}
                          >
                            {Array.from({ length: 50 }, (_, i) => (
                              <option key={1990 + i}>{1990 + i}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          disabled={!editable}
                        >
                          <option>Female</option>
                          <option>Male</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="button"
                        className={`btn ${editable ? "btn-primary" : "btn-outline-secondary"}`}
                        onClick={() => setEditable(!editable)}
                      >
                        {editable ? "Update" : "Edit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
