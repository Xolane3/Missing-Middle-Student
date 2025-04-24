import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import FinancialAidNavbar from '../../../components/financialAidNavBar';

export default function StatusPage() {
  interface Student {
    surname: string;
    studentNumber: string;
    department: string;
    courseCode: string;
    programType: string;
    year: string;
    registrationDate: string;
    averageMark: number;
    nsfasStatus: string;
    studentEmail: string;
    nationality: string;
    race: string;
    idNumber: string;
    gender: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const dummyData: Student[] = [
      {
        surname: 'Mokoena',
        studentNumber: '218123456',
        department: 'IT',
        courseCode: 'ITM321',
        programType: 'Diploma',
        year: '3rd Year',
        registrationDate: '2022-01-15',
        averageMark: 72,
        nsfasStatus: 'Pending',
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
        nsfasStatus: 'Pending',
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
        nsfasStatus: 'Pending',
        studentEmail: '219987654@tut4life.ac.za',
        nationality: 'Zimbabwean',
        race: 'White',
        idNumber: '0001185919081',
        gender: 'Female',
      },
    ];
    setStudents(dummyData);
  }, []);

  const handleStatusUpdate = (studentNumber: string, status: 'Funded' | 'Not Funded') => {
    setStudents((prev) =>
      prev.map((student) =>
        student.studentNumber === studentNumber
          ? { ...student, nsfasStatus: status }
          : student
      )
    );
  };

  const handleStatusUpdateWithPrompt = (studentNumber: string, status: 'Funded' | 'Not Funded') => {
    Swal.fire({
      title: 'Admin Password Required',
      input: 'password',
      inputLabel: 'Enter admin password',
      inputPlaceholder: 'Password',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: (password) => {
        if (password !== 'admin123') {
          Swal.showValidationMessage('Incorrect password');
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusUpdate(studentNumber, status);
        Swal.fire({
          icon: 'success',
          title: `Status changed to "${status}"`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = Object.values(student)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || student.nsfasStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <FinancialAidNavbar />
      <h1 className="text-2xl font-bold text-center my-4">NSFAS Status Update</h1>

      <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search students..."
          className="form-control w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Funded">Funded</option>
          <option value="Not Funded">Not Funded</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

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
                <th>Race</th>
                <th>Department</th>
                <th>Course Code</th>
                <th>Program</th>
                <th>Year</th>
                <th>Registration Date</th>
                <th>NSFAS Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
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
                    <td>
                      <span
                        className={`fw-bold ${
                          student.nsfasStatus === 'Funded'
                            ? 'text-success'
                            : student.nsfasStatus === 'Not Funded'
                            ? 'text-danger'
                            : 'text-warning'
                        }`}
                      >
                        {student.nsfasStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          handleStatusUpdateWithPrompt(student.studentNumber, 'Funded')
                        }
                      >
                        Funded
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleStatusUpdateWithPrompt(student.studentNumber, 'Not Funded')
                        }
                      >
                        Not Funded
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="text-muted py-3">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
