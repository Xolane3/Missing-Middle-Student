import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TechnicianLogin() {
  const navigate = useNavigate();

  const [role, setRole] = useState("technician");
  const [technicianEmail, setTechnicianEmail] = useState("");
  const [technicianPassword, setTechnicianPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Navigate to corresponding login route
    if (selectedRole === "admin") {
      navigate("/admin/login");
    } else if (selectedRole === "student") {
      navigate("/student/login");
    } else if (selectedRole === "technician") {
      navigate("/technician/login");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (technicianEmail === "" && technicianPassword === "") {
      navigate("/technician/dashboard");
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h3 className="text-center mb-4">Technician Login</h3>

          {/* Role Selection */}
          <div className="mb-4 d-flex justify-content-center gap-3">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="admin"
                value="admin"
                checked={role === "admin"}
                onChange={handleRoleChange}
              />
              <label className="form-check-label" htmlFor="admin">
                Admin
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="technician"
                value="technician"
                checked={role === "technician"}
                onChange={handleRoleChange}
              />
              <label className="form-check-label" htmlFor="technician">
                Technician
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="student"
                value="student"
                checked={role === "student"}
                onChange={handleRoleChange}
              />
              <label className="form-check-label" htmlFor="student">
                Student
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={technicianEmail}
                onChange={(e) => setTechnicianEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={technicianPassword}
                onChange={(e) => setTechnicianPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between mb-3">
              <small
                className="text-primary"
                role="button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </small>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
