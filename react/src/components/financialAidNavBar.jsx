import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import {
  BsBoxArrowRight,
  BsBell,
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

const FinancialAidNavbar = ({
  username = "AidAdmin01",
  email = "aidadmin@example.com",
  notifications = 0,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);

  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [bsModal, setBsModal] = useState(null);
  const [editable, setEditable] = useState(false);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/120");
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Smith",
    email: "aid@example.com",
    day: "1",
    month: "January",
    year: "1990",
    gender: "Other",
  });

  useEffect(() => {
    if (modalRef.current) {
      const modal = new Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
      setBsModal(modal);
    }
  }, []);

  const openModal = () => bsModal?.show();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        navigate("/admin/login");
      }
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary  shadow-sm px-4 py-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <BsPersonCircle
              className="text-white fs-3"
              role="button"
              onClick={openModal}
            />
           
            <div className="d-flex flex-column text-white">
            <Link to= "/financialaid/dashboard" className="d-flex flex-column text-white text-decoration-none gap-1" >
              <span className="fw-semibold" role="button">Welcome, {username}</span>
              <small className="text-light">{email}</small>
              </Link>
            </div>
          </div>
        

          <div className="d-flex gap-4 align-items-center">
            <Link
              to="/financialaid/notifications"
              className="nav-link position-relative"
              style={{
                ...linkStyle,
                ...(hoveredLink === "notifications" || isActive("/financialaid/notifications")
                  ? linkHoverStyle
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("notifications")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <BsBell /> Notifications ({notifications})
            </Link>

            <Link
              to="/financialaid/status"
              className="nav-link"
              style={{
                ...linkStyle,
                ...(hoveredLink === "status" || isActive("/financialaid/status")
                  ? linkHoverStyle
                  : {}),
              }}
              onMouseEnter={() => setHoveredLink("status")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              Update NSFAS Status
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
              <h5 className="modal-title" id="accountModalLabel">Account Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex gap-4">
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

                <div className="flex-grow-1">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!editable}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!editable}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editable}
                      />
                    </div>

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
                            {["January", "February", "March", "April", "May", "June", "July",
                              "August", "September", "October", "November", "December"].map(month => (
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
                        className={`btn ${editable ? "btn-success" : "btn-outline-secondary"}`}
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

export default FinancialAidNavbar;
