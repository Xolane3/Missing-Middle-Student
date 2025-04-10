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
              <label htmlFor="studentNumber" className="form-label">Student Number</label>
              <input
                type="text"
                className="form-control"
                id="studentNumber"
                placeholder="Enter student number"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
               
              />
            </div>

            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Surname</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder="Enter surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor="initials" className="form-label">Initials</label>
              <input
                type="text"
                className="form-control"
                id="initials"
                placeholder="Enter initials"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor="qualification" className="form-label">Qualification</label>
              <select
                className="form-control"
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                
              >
                <option value="">Select Qualification</option>
                <option value="NDip IT: Multimedia">NDip IT: Multimedia</option>
                <option value="BSc Computer Science">BSc Computer Science</option>
                <option value="BEng Electrical Engineering">BEng Electrical Engineering</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="currentYear" className="form-label">Current Year</label>
              <input
                type="number"
                className="form-control"
                id="currentYear"
                placeholder="Enter current year (e.g., 2025)"
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                
              />
            </div>

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

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                
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
