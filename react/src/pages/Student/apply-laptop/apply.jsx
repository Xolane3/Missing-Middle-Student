import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/studentNavbar";

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

  const [nsfasProofFile, setNsfasProofFile] = useState(null);
  const [recomProofFile, setRecomProofFile] = useState(null); // New state

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("You must accept the Terms and Conditions and POPI consent to proceed.");
      return;
    }

    if (nsfasStatus === "Not on NSFAS" && !nsfasProofFile) {
      alert("Please upload proof of your NSFAS status.");
      return;
    }

    if (missingMiddleStatus === "Yes, I have a recommendation" && !recomProofFile) {
      alert("Please upload proof of your recommendation.");
      return;
    }

    // TODO: Submit logic (FormData for files if needed)
    alert("Application submitted successfully!");
    navigate("/student/dashboard");
  };

  const toggleTermsModal = () => setShowTermsModal(!showTermsModal);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Apply for Laptop</h2>
        <form onSubmit={handleSubmit} className="w-75 mx-auto">

          {/* Student Name */}
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="studentName"
              value={studentName} onChange={(e) => setStudentName(e.target.value)} />
          </div>

          {/* Student Email */}
          <div className="mb-3">
            <label htmlFor="studentEmail" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="studentEmail"
              value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
          </div>

          {/* Programme */}
          <div className="mb-3">
            <label htmlFor="programme" className="form-label">Current Programme</label>
            <select className="form-control" id="programme" value={programme} onChange={(e) => setProgramme(e.target.value)} required>
              <option value="">Select Programme</option>
              <option value="Diploma">Diploma</option>
              <option value="Advanced Diploma">Advanced Diploma</option>
            </select>
          </div>

          {/* Citizenship */}
          <div className="mb-3">
            <label htmlFor="citizenship" className="form-label">South African Citizenship</label>
            <select className="form-control" id="citizenship" value={citizenship} onChange={(e) => setCitizenship(e.target.value)}>
              <option value="">Select Citizenship</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Campus */}
          <div className="mb-3">
            <label htmlFor="campus" className="form-label">Campus</label>
            <select className="form-control" id="campus" value={campus} onChange={(e) => setCampus(e.target.value)}>
              <option value="">Select Campus</option>
              <option value="Campus 1">Campus 1</option>
              <option value="Campus 2">Campus 2</option>
              <option value="Campus 3">Campus 3</option>
              <option value="Campus 4">Campus 4</option>
            </select>
          </div>

          {/* Nationality */}
          <div className="mb-3">
            <label htmlFor="nationality" className="form-label">National Group</label>
            <select className="form-control" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)}>
              <option value="">Select Nationality</option>
              <option value="African">African</option>
              <option value="Coloured">Coloured</option>
              <option value="Indian">Indian</option>
            </select>
          </div>

          {/* Course */}
          <div className="mb-3">
            <label htmlFor="course" className="form-label">Course</label>
            <input type="text" className="form-control" id="course"
              value={course} onChange={(e) => setCourse(e.target.value)} />
          </div>

          {/* Upload Academic Record */}
          <div className="mb-3">
            <label htmlFor="academicRecordFile" className="form-label">Upload Academic Record</label>
            <input type="file" className="form-control" id="academicRecordFile"
              accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setAcademicRecordFile(e.target.files[0])} />
            <small className="form-text text-muted">Accepted formats: PDF, JPG, JPEG, PNG</small>
          </div>


          {/* NSFAS Status */}
          <div className="mb-3">
            <label htmlFor="nsfasStatus" className="form-label">NSFAS Status</label>
            <select className="form-control" id="nsfasStatus" value={nsfasStatus}
              onChange={(e) => setNsfasStatus(e.target.value)}>
              <option value="">Select NSFAS Status</option>
              <option value="Not on NSFAS">Not on NSFAS</option>
              <option value="On NSFAS">On NSFAS</option>
            </select>
          </div>

          {/* Conditional NSFAS Proof Upload */}
          {nsfasStatus === "Not on NSFAS" && (
            <div className="mb-3">
              <label htmlFor="nsfasProofFile" className="form-label">Upload Proof of NSFAS Status</label>
              <input type="file" className="form-control" id="nsfasProofFile"
                accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setNsfasProofFile(e.target.files[0])} />
              <small className="form-text text-muted">Accepted formats: PDF, JPG, JPEG, PNG</small>
            </div>
          )}

          {/* Recommendation Status */}
          <div className="mb-3">
            <label htmlFor="recomStatus" className="form-label">Recommendation Status</label>
            <select className="form-control" id="recomStatus" value={missingMiddleStatus}
              onChange={(e) => setMissingMiddleStatus(e.target.value)}>
              <option value="">Select Recommendation Status</option>
              <option value="Yes, I have a recommendation">Yes, I have a recommendation</option>
              <option value="Not recommended">Not recommended</option>
            </select>
          </div>

          {/* Conditional Recommendation Proof Upload */}
          {missingMiddleStatus === "Yes, I have a recommendation" && (
            <div className="mb-3">
              <label htmlFor="recomProofFile" className="form-label">Upload Recommendation Proof</label>
              <input type="file" className="form-control" id="recomProofFile"
                accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setRecomProofFile(e.target.files[0])} />
              <small className="form-text text-muted">Accepted formats: PDF, JPG, JPEG, PNG</small>
            </div>
          )}


          {/* Terms Checkbox */}
          <div className="mb-3">
            <input type="checkbox" id="termsCheckbox" checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)} />
            <label htmlFor="termsCheckbox" className="form-label ms-2">
              I accept the <span style={{ color: "blue", cursor: "pointer" }} onClick={toggleTermsModal}>Terms and Conditions and POPI Policy</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Submit Application</button>
        </form>

        {/* Terms Modal */}
        {showTermsModal && (
          <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Terms and Conditions</h5>
                  <button type="button" className="btn-close" onClick={toggleTermsModal}></button>
                </div>
                <div className="modal-body">
                  <h6>Terms and Conditions</h6>
                  <p>By applying for this laptop, you agree to the following terms and conditions...</p>
                  <h6>POPI Policy</h6>
                  <p>We respect your privacy and will handle your data responsibly according to the Protection of Personal Information Act...</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={toggleTermsModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
