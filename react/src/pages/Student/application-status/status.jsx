import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/studentNavbar';

const ApplicationStatus = () => {
  const navigate = useNavigate();

  // Simulated real-time fetched user data
  const [user, setUser] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
    applicationStatus: 'pending', // can be 'pending', 'approved', 'rejected'
    deviceStatus: 'out_of_device', // can be 'approved', 'out_of_device'
  });

  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Simulate fetching application status from API every 10 seconds
    const interval = setInterval(() => {
      // Example: Replace with real API fetch
      console.log('Checking for status updates...');

      // Simulate a change in status (e.g., application approved)
      setUser((prev) => ({
        ...prev,
        applicationStatus: 'approved', // simulate status change
      }));
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => navigate("/student/login");
  const handleApplyForLaptop = () => navigate("/student/apply-laptop");
  const handleStatusCheck = () => navigate("/student/application-status");

  return (
    <>
      <NavBar
        username={user.username}
        email={user.email}
        notifications={notifications}
        onLogout={handleLogout}
        onApplyForLaptop={handleApplyForLaptop}
        onStatusCheck={handleStatusCheck}
      />

      <div className="container mt-5">
        <h2 className="mb-4">📋 Application Status</h2>

        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Hi {user.username} 👋</h5>
            <p>Below is the latest status of your laptop application:</p>

            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>Status:</strong>{" "}
                <span className={`badge ${
                  user.applicationStatus === 'approved'
                    ? 'bg-success'
                    : user.applicationStatus === 'pending'
                    ? 'bg-warning text-dark'
                    : 'bg-danger'
                }`}>
                  {user.applicationStatus.toUpperCase()}
                </span>
              </li>
              <li className="list-group-item">
                <strong>Device Status:</strong>{" "}
                <span className={`badge ${
                  user.deviceStatus === 'approved'
                    ? 'bg-success'
                    : 'bg-secondary'
                }`}>
                  {user.deviceStatus.replace(/_/g, ' ').toUpperCase()}
                </span>
              </li>
            </ul>

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => navigate('/student/dashboard')}
              >
                ⬅ Back to Dashboard
              </button>
              {user.applicationStatus !== 'approved' && (
                <button className="btn btn-primary" onClick={handleApplyForLaptop}>
                  📝 Edit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationStatus;
