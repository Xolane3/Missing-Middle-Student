import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import OneStopNavbar from "../../components/oneStopNavbar";

const dummyStudents = [
  {
    surname: "Mokoena",
    studentNumber: "218123456",
    department: "IT",
    courseCode: "ITM321",
    programType: "Diploma",
    year: "3rd Year",
    registrationDate: "2022-01-15",
    nsfasStatus: true,
    studentEmail: "218123456@tut4life.ac.za",
    nationality: "South African",
    race: "Black African",
    idNumber: "9901185919081",
    gender: "Female",
  },
  {
    surname: "Naidoo",
    studentNumber: "218654321",
    department: "Engineering",
    courseCode: "ENG210",
    programType: "Advanced Diploma",
    year: "4th Year",
    registrationDate: "2021-02-10",
    nsfasStatus: false,
    studentEmail: "218654321@tut4life.ac.za",
    nationality: "South African",
    race: "Indian",
    idNumber: "9802195919081",
    gender: "Male",
  },
  {
    surname: "Smith",
    studentNumber: "219987654",
    department: "Business",
    courseCode: "BUS101",
    programType: "Diploma",
    year: "2nd Year",
    registrationDate: "2023-03-01",
    nsfasStatus: true,
    studentEmail: "219987654@tut4life.ac.za",
    nationality: "Zimbabwean",
    race: "White",
    idNumber: "0001185919081",
    gender: "Female",
  },
];

const OneStopDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = dummyStudents.filter((student) => {
    const values = Object.values(student).join(" ").toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <OneStopNavbar username="OneStop Admin" email="onestop@tut.ac.za" notifications={3} />
      <div className="container mt-4">
        {/* Main centered header */}
        <h2 className="text-center mb-4 fw-bold">One Stop Dashboard</h2>

        {/* Section heading for student table */}
        <h4 className="mb-3">Registered TUT Students</h4>

        <div className="mb-3 d-flex align-items-center">
          <BsSearch className="me-2" />
          <input
            type="text"
            placeholder="Search students..."
            className="form-control w-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Surname</th>
              <th>Student Number</th>
              <th>ID Number</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Race</th>
              <th>Department</th>
              <th>Course Code</th>
              <th>Program</th>
              <th>Year</th>
              <th>Registration Date</th>
              <th>NSFAS Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.surname}</td>
                <td>{student.studentNumber}</td>
                <td>{student.idNumber}</td>
                <td>{student.gender}</td>
                <td>{student.studentEmail}</td>
                <td>{student.race}</td>
                <td>{student.department}</td>
                <td>{student.courseCode}</td>
                <td>{student.programType}</td>
                <td>{student.year}</td>
                <td>{student.registrationDate}</td>
                <td>{student.nsfasStatus ? 'Funded' : 'Not Funded'}</td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="13" className="text-center text-muted">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OneStopDashboard;
