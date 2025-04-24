import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/adminNavBar';
import AdminFooter from '../../../components/adminFooter';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [nsfasFilter, setNsfasFilter] = useState('all');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const dummyData = [
      {
        surname: 'Mokoena',
        studentNumber: '218123456',
        department: 'IT',
        courseCode: 'ITM321',
        programType: 'Diploma',
        year: '3rd Year',
        registrationDate: '2022-01-15',
        averageMark: 72,
        studentEmail: '218123456@tut4life.ac.za',
        nationality: 'South African',
        race: 'Black African',
        idNumber: '9901185919081',
        gender: 'Female',
      },
      {
        surname: 'Naidoo',
        studentNumber: '218654321',
        department: 'Engineering',
        courseCode: 'ENG210',
        programType: 'Advanced Diploma',
        year: '4th Year',
        registrationDate: '2021-02-10',
        averageMark: 80,
        studentEmail: '218654321@tut4life.ac.za',
        nationality: 'South African',
        race: 'Indian',
        idNumber: '9802195919081',
        gender: 'Male',
      },
      {
        surname: 'Smith',
        studentNumber: '219987654',
        department: 'Business',
        courseCode: 'BUS101',
        programType: 'Diploma',
        year: '2nd Year',
        registrationDate: '2023-03-01',
        averageMark: 68,
        studentEmail: '219987654@tut4life.ac.za',
        nationality: 'Zimbabwean',
        race: 'White',
        idNumber: '0001185919081',
        gender: 'Female',
      },
    ];
    setStudents(dummyData);
  }, []);

  const filteredStudents = students
    .filter((student) =>
      Object.values(student).join(' ').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortAsc ? a.averageMark - b.averageMark : b.averageMark - a.averageMark));

  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
        <AdminNavbar />
        <h1 className="text-2xl font-bold text-center mb-4">Registered TUT Students</h1>

        {/* Search Input */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search students..."
            className="form-control w-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="btn btn-outline-primary ms-3"
          >
            Sort by Avg: {sortAsc ? 'Low → High' : 'High → Low'}
          </button>
        </div>

        {/* Centered Table */}
        <div className="d-flex justify-content-center">
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center w-auto">
              <thead className="table-dark">
                <tr>
                  <th>Surname</th>
                  <th>Student Number</th>
                  <th>ID Number</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Nationality</th>
                  <th>Race</th>
                  <th>Department</th>
                  <th>Course Code</th>
                  <th>Program</th>
                  <th>Year</th>
                  <th>Registration Date</th>
                  <th>Average Mark (%)</th>
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
                    <td>{student.nationality}</td>
                    <td>{student.race}</td>
                    <td>{student.department}</td>
                    <td>{student.courseCode}</td>
                    <td>{student.programType}</td>
                    <td>{student.year}</td>
                    <td>{student.registrationDate}</td>
                    <td>{student.averageMark}</td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="13" className="text-muted py-2">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <AdminFooter />
      </div>
    </div>
  );
}
