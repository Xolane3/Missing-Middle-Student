import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/studentNavbar"; // Import the Navbar component


export default function ApplyForLaptop() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [programme, setProgramme] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [campus, setCampus] = useState("");
  const [nationality, setNationality] = useState("");
  const [course, setCourse] = useState("");
  const [academicPerformance, setAcademicPerformance] = useState("");
  const [financialAidStatus, setFinancialAidStatus] = useState("");
  const [nsfasStatus, setNsfasStatus] = useState("");
  const [missingMiddleStatus, setMissingMiddleStatus] = useState("");
  const [facultySelection, setFacultySelection] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("You must accept the Terms and Conditions and POPI consent to proceed.");
      return;
    }

    // Handle form submission, e.g., send data to the backend
    // For now, let's simulate success and navigate back to the dashboard
    alert("Application submitted successfully!");
    navigate("/student/dashboard");
  };

  const toggleTermsModal = () => setShowTermsModal(!showTermsModal);

  return (
    <div>
      {/* Include the Navbar component here */}
      <Navbar />
      
      <div className="container mt-5">
        <h2 className="mb-4">Apply for Laptop</h2>
        <form onSubmit={handleSubmit} className="w-75 mx-auto">
          {/* Student Name */}
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              placeholder="Enter your full name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>

          {/* Student Email */}
          <div className="mb-3">
            <label htmlFor="studentEmail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="studentEmail"
              placeholder="Enter your email address"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
          </div>

          {/* Programme */}
          <div className="mb-3">
            <label htmlFor="programme" className="form-label">
              Current Programme
            </label>
            <select
              className="form-control"
              id="programme"
              value={programme}
              onChange={(e) => setProgramme(e.target.value)}
              required
            >
              <option value="">Select Programme</option>
              <option value="Diploma">Diploma</option>
              <option value="Advanced Diploma">Advanced Diploma</option>
            </select>
          </div>

          {/* Citizenship */}
          <div className="mb-3">
            <label htmlFor="citizenship" className="form-label">
              South African Citizenship
            </label>
            <select
              className="form-control"
              id="citizenship"
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
              required
            >
              <option value="">Select Citizenship</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Campus */}
          <div className="mb-3">
            <label htmlFor="campus" className="form-label">
              Campus
            </label>
            <select
              className="form-control"
              id="campus"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              required
            >
              <option value="">Select Campus</option>
              <option value="Campus 1">Campus 1</option>
              <option value="Campus 2">Campus 2</option>
              <option value="Campus 3">Campus 3</option>
              <option value="Campus 4">Campus 4</option>
            </select>
          </div>

          {/* Nationality */}
          <div className="mb-3">
            <label htmlFor="nationality" className="form-label">
              National Group
            </label>
            <select
              className="form-control"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            >
              <option value="">Select Nationality</option>
              <option value="African">African</option>
              <option value="Coloured">Coloured</option>
              <option value="Indian">Indian</option>
            </select>
          </div>

          {/* Course */}
          <div className="mb-3">
            <label htmlFor="course" className="form-label">
              Course
            </label>
            <input
              type="text"
              className="form-control"
              id="course"
              placeholder="Enter your course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </div>

          {/* Academic Performance */}
          <div className="mb-3">
            <label htmlFor="academicPerformance" className="form-label">
              Academic Performance (Average Percentage)
            </label>
            <input
              type="number"
              className="form-control"
              id="academicPerformance"
              placeholder="Enter your average percentage"
              value={academicPerformance}
              onChange={(e) => setAcademicPerformance(e.target.value)}
              required
            />
          </div>

          {/* Financial Aid Status */}
          <div className="mb-3">
            <label htmlFor="financialAidStatus" className="form-label">
              Financial Aid Status
            </label>
            <select
              className="form-control"
              id="financialAidStatus"
              value={financialAidStatus}
              onChange={(e) => setFinancialAidStatus(e.target.value)}
              required
            >
              <option value="">Select Financial Aid Status</option>
              <option value="Verified">Verified</option>
              <option value="Not Verified">Not Verified</option>
            </select>
          </div>

          {/* NSFAS Status */}
          <div className="mb-3">
            <label htmlFor="nsfasStatus" className="form-label">
              NSFAS Status
            </label>
            <select
              className="form-control"
              id="nsfasStatus"
              value={nsfasStatus}
              onChange={(e) => setNsfasStatus(e.target.value)}
              required
            >
              <option value="">Select NSFAS Status</option>
              <option value="Not on NSFAS">Not on NSFAS</option>
              <option value="On NSFAS">On NSFAS</option>
            </select>
          </div>

          {/* Missing Middle Status */}
          <div className="mb-3">
            <label htmlFor="missingMiddleStatus" className="form-label">
              Missing Middle Status
            </label>
            <select
              className="form-control"
              id="missingMiddleStatus"
              value={missingMiddleStatus}
              onChange={(e) => setMissingMiddleStatus(e.target.value)}
              required
            >
              <option value="">Select Missing Middle Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Faculty Selection */}
          <div className="mb-3">
            <label htmlFor="facultySelection" className="form-label">
              Faculty Selection
            </label>
            <input
              type="text"
              className="form-control"
              id="facultySelection"
              placeholder="Enter your faculty selection"
              value={facultySelection}
              onChange={(e) => setFacultySelection(e.target.value)}
              required
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mb-3">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="termsCheckbox" className="form-label ms-2">
              I accept the{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={toggleTermsModal}
              >
                Terms and Conditions and POPI Policy
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit Application
          </button>
        </form>

        {/* Terms and Conditions Modal */}
        {showTermsModal && (
          <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Terms and Conditions</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleTermsModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <h6>Terms and Conditions</h6>
                  <p>
                    By applying for this laptop, you agree to the following
                    terms and conditions...
                  </p>
                  <h6>POPI Policy</h6>
                  <p>
                    We respect your privacy and will handle your data
                    responsibly according to the Protection of Personal
                    Information Act...
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleTermsModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
