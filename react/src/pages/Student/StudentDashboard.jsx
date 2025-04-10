import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  
  // Example: Simulating user data passed after login
  const [user, setUser] = useState({
    username: "John Doe", // This should be dynamically fetched from login data
    email: "john.doe@example.com", // This should also be fetched from login data
    applicationStatus: "pending", // Simulating application status
    deviceStatus: "out_of_device", // Example status, could be 'approved', 'pending', or 'out_of_device'
  });

  const [notifications, setNotifications] = useState(3); // Number of notifications

  useEffect(() => {
    // Simulate fetching user data and application status from API
    // In a real application, you would replace this with actual data fetching
  }, []);

  const handleLogout = () => {
    // Simulate logout by clearing session or token
    navigate("/student/login"); // Redirect to login page
  };

  const handleApplyForLaptop = () => {
    // Navigate to the application page to apply for the laptop
    navigate("/apply-laptop");
  };

  const handleStatusCheck = () => {
    // Navigate to a page to view the application status
    navigate("/status");
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar bg-light p-3">
        <div className="container-fluid">
          <span className="navbar-brand">
            Welcome, {user.username}
          </span>
          <span className="navbar-text mx-3">
            {user.email}
          </span>
          <button className="btn btn-primary mx-2" onClick={() => setNotifications(notifications + 1)}>
            Notifications ({notifications})
          </button>
          <button className="btn btn-success mx-2" onClick={handleApplyForLaptop}>
            Apply for Laptop
          </button>
          <button className="btn btn-info mx-2" onClick={handleStatusCheck}>
            Application Status
          </button>
          <button className="btn btn-danger mx-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Application Status */}
      <div className="container mt-5">
        <h2>Application Status</h2>
        {user.deviceStatus === "out_of_device" && (
          <div className="alert alert-warning" role="alert">
            Out of device: There are currently no devices available for assignment.
          </div>
        )}
        {user.applicationStatus === "pending" && (
          <div className="alert alert-info" role="alert">
            Your application is pending approval. Please wait for the admin's response.
          </div>
        )}
        {user.applicationStatus === "approved" && (
          <div className="alert alert-success" role="alert">
            Your application has been approved! You will receive a notification when the device is assigned.
          </div>
        )}
      </div>
    </div>
  );
}
