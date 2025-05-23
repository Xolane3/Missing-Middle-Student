import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/studentNavbar';
import { BsHouse, BsPersonCircle } from 'react-icons/bs';
import { CSVLink } from 'react-csv';

const ApplicationStatus = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
    applicationStatus: 'pending',
    deviceStatus: 'out_of_device',
    applicationSteps: [
      { step: 'Application Submitted', status: 'completed' },
      { step: 'Validating Documents', status: 'completed' },
      { step: 'Verification Process', status: 'pending' },
      { step: 'Evaluation', status: 'pending' },
      { step: 'Approval', status: 'pending' },
    ],
    rejectionReason: '',
  });

  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Simulating status update...');

      setUser((prev) => {
        // Stop further progress if any step failed
        if (prev.applicationSteps.some(step => step.status === 'failed')) {
          console.log('Application halted due to failed step.');
          return prev;
        }

        const updatedSteps = [...prev.applicationSteps];
        const nextIndex = updatedSteps.findIndex(step => step.status === 'pending');

        if (nextIndex !== -1) {
          if (updatedSteps[nextIndex].step === 'Verification Process') {
            updatedSteps[nextIndex].status = 'failed';
            return {
              ...prev,
              applicationSteps: updatedSteps,
              applicationStatus: 'rejected',
              rejectionReason: 'Verification documents are not valid',
            };
          } else {
            updatedSteps[nextIndex].status = 'completed';
          }

          const allCompleted = updatedSteps.every(step => step.status === 'completed');
          return {
            ...prev,
            applicationSteps: updatedSteps,
            applicationStatus: allCompleted ? 'approved' : prev.applicationStatus,
          };
        }

        return prev;
      });
    }, 5000);

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
                <strong>Status:</strong>{' '}
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
                <strong>Device Status:</strong>{' '}
                <span className={`badge ${
                  user.deviceStatus === 'approved' ? 'bg-success' : 'bg-secondary'
                }`}>
                  {user.deviceStatus.replace(/_/g, ' ').toUpperCase()}
                </span>
              </li>
            </ul>

            <div className="mt-4">
              <h5>Application Progress</h5>

              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                {user.applicationSteps.map((step, index) => {
                  const statusColor =
                    step.status === 'completed'
                      ? 'bg-success text-white'
                      : step.status === 'failed'
                      ? 'bg-danger text-white'
                      : 'bg-warning text-dark';

                  const icon =
                    step.status === 'completed'
                      ? '✅'
                      : step.status === 'failed'
                      ? '❌'
                      : '⏳';

                  return (
                    <div
                      key={index}
                      className={`text-center p-2 m-1 rounded shadow-sm ${statusColor}`}
                      style={{
                        minWidth: '160px',
                        flex: '1 0 auto',
                        fontSize: '0.85rem',
                      }}
                    >
                      <div style={{ fontSize: '1.5rem' }}>{icon}</div>
                      {step.step}
                    </div>
                  );
                })}
              </div>

              {user.applicationSteps.some(step => step.status === 'failed') && (
                <div className="alert alert-danger mt-3">
                  <strong>Reason for Rejection:</strong> {user.rejectionReason || "Not specified"}
                </div>
              )}
            </div>

            <div className="d-flex justify-content-end mt-4">
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
