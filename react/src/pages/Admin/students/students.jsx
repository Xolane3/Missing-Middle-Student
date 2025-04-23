import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/adminNavBar';
import AdminFooter from '../../../components/adminFooter'; // ✅ Import footer

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [nsfasFilter, setNsfasFilter] = useState('all');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        studentNumber: '2023123456',
        surname: 'Mokoena',
        initials: 'T.',
        averageMark: 65,
        course: 'National Diploma',
        yearOfStudy: 1,
        nsfasFunded: false,
      },
      {
        id: 2,
        studentNumber: '2023987654',
        surname: 'Dlamini',
        initials: 'L.',
        averageMark: 72,
        course: 'Advanced Diploma',
        yearOfStudy: 1,
        nsfasFunded: true,
      },
      {
        id: 3,
        studentNumber: '2023765432',
        surname: 'Sithole',
        initials: 'N.',
        averageMark: 68,
        course: 'Higher Certificate',
        yearOfStudy: 2,
        nsfasFunded: false,
      },
      {
        id: 4,
        studentNumber: '2023123111',
        surname: 'Zulu',
        initials: 'A.',
        averageMark: 80,
        course: 'BTech',
        yearOfStudy: 1,
        nsfasFunded: false,
      },
      {
        id: 5,
        studentNumber: '2023999999',
        surname: 'Khumalo',
        initials: 'Z.',
        averageMark: 90,
        course: 'Advanced Diploma',
        yearOfStudy: 1,
        nsfasFunded: false,
      },
    ];
    setStudents(dummyData);
  }, []);

  const filteredStudents = students
    .filter((s) =>
      `${s.studentNumber} ${s.surname} ${s.initials}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((s) =>
      courseFilter === 'all' ? true : s.course.toLowerCase() === courseFilter
    )
    .filter((s) =>
      nsfasFilter === 'all'
        ? true
        : nsfasFilter === 'funded'
        ? s.nsfasFunded
        : !s.nsfasFunded
    )
    .sort((a, b) => (sortAsc ? a.averageMark - b.averageMark : b.averageMark - a.averageMark));

  return (
    <div className="d-flex flex-column min-vh-100">
      <div >
        <AdminNavbar />
        <h1 className="text-2xl font-bold text-center mb-4">Registered TUT Students</h1>

        {/* Search & Filters - Horizontal Layout */}
        <div className="d-flex flex-wrap justify-content-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or student number"
            className="form-control w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select w-auto"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="national diploma">National Diploma</option>
            <option value="advanced diploma">Advanced Diploma</option>
          </select>

          <select
            className="form-select w-auto"
            value={nsfasFilter}
            onChange={(e) => setNsfasFilter(e.target.value)}
          >
            <option value="all">All NSFAS Status</option>
            <option value="funded">Funded Only</option>
            <option value="unfunded">Unfunded Only</option>
          </select>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="btn btn-outline-primary"
          >
            Sort by Avg: {sortAsc ? 'Low → High' : 'High → Low'}
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive d-flex justify-content-center">
          <table className="table table-bordered table-hover text-center w-auto">
            <thead className="table-light">
              <tr>
                <th>Student #</th>
                <th>Surname</th>
                <th>Initials</th>
                <th>Course</th>
                <th>Year</th>
                <th>Average</th>
                <th>NSFAS Funded</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td>{s.studentNumber}</td>
                  <td>{s.surname}</td>
                  <td>{s.initials}</td>
                  <td>{s.course}</td>
                  <td>{s.yearOfStudy}</td>
                  <td>{s.averageMark}%</td>
                  <td>{s.nsfasFunded ? 'Yes' : 'No'}</td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-muted py-2">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-auto">
        <AdminFooter /> {/* Footer added here */}
      </div>
    </div>
  );
}
