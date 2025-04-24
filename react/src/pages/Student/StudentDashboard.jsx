// StudentDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/studentNavbar";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    applicationStatus: "pending",
    deviceStatus: "out_of_device",
  });

  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Fetch actual data here if needed
  }, []);

  const handleLogout = () => navigate("/student/login");
  const handleApplyForLaptop = () => navigate("/student/apply-laptop");
  const handleStatusCheck = () => navigate("/student/application-status");
  const handleProfileClick = () => navigate("/student/profile");

  const renderStatusAlert = () => {
    if (user.deviceStatus === "out_of_device") {
      return (
        <div className="alert alert-warning">
          <strong>Out of Device:</strong> No devices are currently available.
        </div>
      );
    }
    if (user.applicationStatus === "pending") {
      return (
        <div className="alert alert-info">
          <strong>Application Pending:</strong> Awaiting admin approval.
        </div>
      );
    }
    if (user.applicationStatus === "approved") {
      return (
        <div className="alert alert-success">
          <strong>Approved:</strong> You'll be notified when a device is assigned.
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <NavBar
        username={user.username}
        email={user.email}
        notifications={notifications}
        onLogout={handleLogout}
        onApplyForLaptop={handleApplyForLaptop}
        onStatusCheck={handleStatusCheck}
        profilePic={user.profilePic}
      />

      <div className="container mt-4">
        <div className="text-center mb-4">
          <h1 className="fw-bold">
            <span
              style={{  color: "#0d6efd", textDecoration: "underline" }}
            >
              Welcome, {user.username} 👋
            </span>
          </h1>
          <p className="text-muted">Check your application and device status below</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Application Status</h5>
                {renderStatusAlert()}
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={handleStatusCheck}
                >
                  View Application Details
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Apply for a Laptop</h5>
                <p className="card-text">
                  Need a device for your studies? Apply here to get started.
                </p>
                <button
                  className="btn btn-success"
                  onClick={handleApplyForLaptop}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
