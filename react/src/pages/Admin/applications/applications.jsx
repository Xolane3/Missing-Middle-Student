import { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/adminNavBar';

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        name: "Thabo Mokoena",
        nsfasFunded: false,
        averageMark: 65,
        income: 450000,
        course: "National Diploma",
        yearOfStudy: 1,
        status: "pending",
      },
      {
        id: 2,
        name: "Lerato Dlamini",
        nsfasFunded: true,
        averageMark: 72,
        income: 380000,
        course: "Advanced Diploma",
        yearOfStudy: 1,
        status: "pending",
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
      ["National Diploma", "Advanced Diploma"].includes(app.course) &&
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

  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Review Laptop Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">NSFAS Funded</th>
                <th className="p-3 border-b">Average Mark</th>
                <th className="p-3 border-b">Income</th>
                <th className="p-3 border-b">Course</th>
                <th className="p-3 border-b">Year</th>
                <th className="p-3 border-b">Eligible</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{app.name}</td>
                  <td className="p-3">{app.nsfasFunded ? 'Yes' : 'No'}</td>
                  <td className="p-3">{app.averageMark}%</td>
                  <td className="p-3">R{app.income.toLocaleString()}</td>
                  <td className="p-3">{app.course}</td>
                  <td className="p-3">{app.yearOfStudy}</td>
                  <td className="p-3">{isEligible(app) ? '✅' : '❌'}</td>
                  <td className="p-3 capitalize">{app.status}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      onClick={() => handleDecision(app.id, 'approved')}
                      disabled={!isEligible(app)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDecision(app.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-4 text-center text-gray-500">
                    No applications found.
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
