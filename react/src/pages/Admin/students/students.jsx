import { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/adminNavBar';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        name: "Thabo Mokoena",
        averageMark: 65,
        course: "National Diploma",
        yearOfStudy: 1,
      },
      {
        id: 2,
        name: "Lerato Dlamini",
        averageMark: 72,
        course: "Advanced Diploma",
        yearOfStudy: 1,
      },
      {
        id: 3,
        name: "Nomusa Sithole",
        averageMark: 68,
        course: "National Diploma",
        yearOfStudy: 2,
      },
    ];
    setStudents(dummyData);
  }, []);

  return (
    <div className="p-6">
        <AdminNavbar />
      <h1 className="text-2xl font-bold">Student List</h1>
      <h2 className="text-xl font-bold">First-Year Registered Students</h2>
      <table className="w-full mt-4 border text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Course</th>
            <th className="border px-2 py-1">Year</th>
            <th className="border px-2 py-1">Average</th>
          </tr>
        </thead>
        <tbody>
          {students.filter((s) => s.yearOfStudy === 1).map((s) => (
            <tr key={s.id}>
              <td className="border px-2 py-1">{s.name}</td>
              <td className="border px-2 py-1">{s.course}</td>
              <td className="border px-2 py-1">{s.yearOfStudy}</td>
              <td className="border px-2 py-1">{s.averageMark}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
