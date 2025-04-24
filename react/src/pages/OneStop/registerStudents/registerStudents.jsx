import React, { useState } from "react";
import OneStopNavbar from "../../../components/oneStopNavbar";

const RegisterStudent = () => {
  const [form, setForm] = useState({
    surname: "",
    studentNumber: "",
    department: "",
    courseCode: "",
    programType: "Diploma",
    year: "",
   
    averageMark: "",
    nationality: "",
    studentEmail: "",
    campus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered student:", form);
    alert("Student registered successfully!");
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded CSV:", file.name);
      alert("CSV uploaded. (Parsing not implemented in this demo)");
    }
  };

  return (
    <>
      <OneStopNavbar username="OneStop Admin" email="onestop@tut.ac.za" notifications={3} />
      <div className="container mt-4">
        <h4>Register New Student</h4>

        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                name="surname"
                className="form-control"
                placeholder="Surname"
                value={form.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="studentNumber"
                className="form-control"
                placeholder="Student Number"
                value={form.studentNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                name="studentEmail"
                className="form-control"
                placeholder="Student Email"
                value={form.studentEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="nationality"
                className="form-control"
                placeholder="Nationality"
                value={form.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="campus"
                className="form-control"
                placeholder="Campus"
                value={form.campus}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="department"
                className="form-control"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="courseCode"
                className="form-control"
                placeholder="Course Code"
                value={form.courseCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <select
                name="programType"
                className="form-select"
                value={form.programType}
                onChange={handleChange}
              >
                <option value="Higher Certificate">Higher Certificate</option>
                <option value="National Diploma">National Diploma</option>
                <option value="Diploma">Diploma</option>
                <option value="Advanced Diploma">Advanced Diploma</option>
                <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Honours Degree">Honours Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctoral Degree">Doctoral Degree</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="year"
                className="form-control"
                placeholder="Year (e.g. 2nd Year)"
                value={form.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Register Student
              </button>
            </div>
          </div>
        </form>

        <div className="mb-4">
          <label className="form-label">Upload CSV File of Students</label>
          <input
            type="file"
            accept=".csv"
            className="form-control"
            onChange={handleCSVUpload}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterStudent;
