import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TechnicianLogin() {
  const navigate = useNavigate();

  const [technicianEmail, setTechnicianEmail] = useState("");
  const [technicianPassword, setTechnicianPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate technician login logic (replace with actual API call)
    if (technicianEmail === "technician@example.com" && technicianPassword === "technicianpassword") {
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

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="d-flex justify-content-between mb-4">
            <button
              className="btn btn-secondary w-100 me-2"
              onClick={() => navigate("/student/login")}
            >
              Student Login
            </button>
            <button
              className="btn btn-secondary w-100 ms-2"
              onClick={() => navigate("/admin/login")}
            >
              Admin Login
            </button>
          </div>

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
                required
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
                required
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
