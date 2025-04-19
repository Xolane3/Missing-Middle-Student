import { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/adminNavBar';
import AdminFooter from '../../../components/adminFooter'; // ✅ Import footer

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eligibilityFilter, setEligibilityFilter] = useState('all');

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        studentNumber: '2023123456',
        surname: 'Mokoena',
        initials: 'T.',
        nsfasFunded: false,
        averageMark: 65,
        income: 450000,
        course: 'National Diploma',
        yearOfStudy: 1,
        recommendationLetter: true,
        status: 'pending',
      },
      {
        id: 2,
        studentNumber: '2023987654',
        surname: 'Dlamini',
        initials: 'L.',
        nsfasFunded: true,
        averageMark: 72,
        income: 380000,
        course: 'Advanced Diploma',
        yearOfStudy: 1,
        recommendationLetter: false,
        status: 'pending',
      },
      {
        id: 3,
        studentNumber: '2023765432',
        surname: 'Ndlovu',
        initials: 'S.',
        nsfasFunded: false,
        averageMark: 59,
        income: 500000,
        course: 'National Diploma',
        yearOfStudy: 1,
        recommendationLetter: true,
        status: 'pending',
      },
      {
        id: 4,
        studentNumber: '2023123111',
        surname: 'Zulu',
        initials: 'A.',
        nsfasFunded: false,
        averageMark: 80,
        income: 360000,
        course: 'Advanced Diploma',
        yearOfStudy: 1,
        recommendationLetter: false,
        status: 'pending',
      },
      {
        id: 5,
        studentNumber: '2023777777',
        surname: 'Molefe',
        initials: 'K.',
        nsfasFunded: false,
        averageMark: 67,
        income: 349000,
        course: 'Advanced Diploma',
        yearOfStudy: 1,
        recommendationLetter: true,
        status: 'pending',
      },
      {
        id: 6,
        studentNumber: '2023999999',
        surname: 'Khumalo',
        initials: 'Z.',
        nsfasFunded: false,
        averageMark: 90,
        income: 400000,
        course: 'National Diploma',
        yearOfStudy: 1,
        recommendationLetter: true,
        status: 'pending',
      },
      {
        id: 7,
        studentNumber: '2023001122',
        surname: 'Mthembu',
        initials: 'M.',
        nsfasFunded: false,
        averageMark: 70,
        income: 550000,
        course: 'National Diploma',
        yearOfStudy: 2,
        recommendationLetter: false,
        status: 'pending',
      },
      {
        id: 8,
        studentNumber: '2023222233',
        surname: 'Dube',
        initials: 'N.',
        nsfasFunded: false,
        averageMark: 64,
        income: 370000,
        course: 'Advanced Diploma',
        yearOfStudy: 1,
        recommendationLetter: true,
        status: 'pending',
      },
      {
        id: 9,
        studentNumber: '2023444455',
        surname: 'Mokoena',
        initials: 'T.',
        nsfasFunded: false,
        averageMark: 75,
        income: 399999,
        course: 'National Diploma',
        yearOfStudy: 1,
        recommendationLetter: true,
        status: 'pending',
      },
    ];
    setApplications(dummyData);
  }, []);

  const isEligible = (app) => {
    return (
      !app.nsfasFunded &&
      app.averageMark >= 60 &&
      app.income >= 350000 &&
      app.income < 600000 &&
      ['National Diploma', 'Advanced Diploma'].includes(app.course) &&
      app.yearOfStudy === 1
    );
  };

  const handleDecision = (id, decision) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: decision } : app
      )
    );
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentNumber.includes(searchQuery) ||
      app.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.initials.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEligibility =
      eligibilityFilter === 'all'
        ? true
        : eligibilityFilter === 'eligible'
        ? isEligible(app)
        : !isEligible(app);

    return matchesSearch && matchesEligibility;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
        <AdminNavbar />
        <div className="container mt-5 mb-5">
          <h2 className="text-center mb-4">Review Laptop Applications</h2>

          {/* Filters */}
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search by Student Number, Surname, or Initials"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={eligibilityFilter}
                onChange={(e) => setEligibilityFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="eligible">Eligible</option>
                <option value="notEligible">Not Eligible</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-light">
                <tr>
                  <th>Student Number</th>
                  <th>Surname</th>
                  <th>Initials</th>
                  <th>NSFAS Funded</th>
                  <th>Avg. Mark</th>
                  <th>Income</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Recommendation</th>
                  <th>Eligible</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.studentNumber}</td>
                    <td>{app.surname}</td>
                    <td>{app.initials}</td>
                    <td>{app.nsfasFunded ? 'Yes' : 'No'}</td>
                    <td>{app.averageMark}%</td>
                    <td>R{app.income.toLocaleString()}</td>
                    <td>{app.course}</td>
                    <td>{app.yearOfStudy}</td>
                    <td>{app.recommendationLetter ? '✔️' : '❌'}</td>
                    <td>{isEligible(app) ? '✅' : '❌'}</td>
                    <td className="text-capitalize">{app.status}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleDecision(app.id, 'approved')}
                        disabled={!isEligible(app)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDecision(app.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan="12" className="text-muted">
                      No matching applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-auto"> {/* Ensures footer stays at bottom */}
        <AdminFooter />
      </div>
    </div>
  );
}
