import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [initials, setInitials] = useState("");
  const [qualification, setQualification] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (studentPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    // Simulate student creation logic (replace with actual API call)
    setTimeout(() => {
      setSuccessMessage("Student created successfully!");
      setErrorMessage("");
      navigate("/student/login");
    }, 500); // Simulate network delay
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Student Signup</h3>

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success text-center" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </div>
          </form>

          <div className="d-flex justify-content-between mt-3">
            <small
              className="text-primary"
              role="button"
              onClick={() => navigate("/student/login")}
            >
              Already have an account? Login
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
