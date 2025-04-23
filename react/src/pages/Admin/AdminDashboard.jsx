import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminNavBar";
import AdminFooter from "../../components/adminFooter";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const dummyData = [
      { id: 1, studentNumber: '2023123456', surname: 'Mokoena', initials: 'T.', nsfasFunded: false, averageMark: 65, income: 450000, course: 'National Diploma', yearOfStudy: 1, recommendationLetter: true, status: 'pending' },
      { id: 2, studentNumber: '2023987654', surname: 'Dlamini', initials: 'L.', nsfasFunded: true, averageMark: 72, income: 380000, course: 'Advanced Diploma', yearOfStudy: 1, recommendationLetter: false, status: 'pending' },
      { id: 3, studentNumber: '2023765432', surname: 'Ndlovu', initials: 'S.', nsfasFunded: false, averageMark: 59, income: 500000, course: 'National Diploma', yearOfStudy: 1, recommendationLetter: true, status: 'pending' },
      { id: 4, studentNumber: '2023123111', surname: 'Zulu', initials: 'A.', nsfasFunded: false, averageMark: 80, income: 360000, course: 'Advanced Diploma', yearOfStudy: 1, recommendationLetter: false, status: 'pending' },
      { id: 5, studentNumber: '2023777777', surname: 'Molefe', initials: 'K.', nsfasFunded: false, averageMark: 67, income: 349000, course: 'Advanced Diploma', yearOfStudy: 1, recommendationLetter: true, status: 'pending' },
      { id: 6, studentNumber: '2023999999', surname: 'Khumalo', initials: 'Z.', nsfasFunded: false, averageMark: 90, income: 400000, course: 'National Diploma', yearOfStudy: 1, recommendationLetter: true, status: 'pending' },
      { id: 7, studentNumber: '2023001122', surname: 'Mthembu', initials: 'M.', nsfasFunded: false, averageMark: 70, income: 550000, course: 'National Diploma', yearOfStudy: 2, recommendationLetter: false, status: 'pending' },
      { id: 8, studentNumber: '2023222233', surname: 'Dube', initials: 'N.', nsfasFunded: false, averageMark: 64, income: 370000, course: 'Advanced Diploma', yearOfStudy: 1, recommendationLetter: true, status: 'pending' },
      { id: 9, studentNumber: '2023444455', surname: 'Mokoena', initials: 'T.', nsfasFunded: false, averageMark: 75, income: 399999, course: 'National Diploma', yearOfStudy: 1, recommendationLetter: true, status: 'pending' },
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

  const eligibleStudents = applications.filter(isEligible);
  const notEligibleStudents = applications.filter(app => !isEligible(app));

  const pieData = [
    { name: "Eligible", value: eligibleStudents.length },
    { name: "Not Eligible", value: notEligibleStudents.length },
    { name: "Total Applications", value: applications.length }
  ];

  const barData = applications.map(app => ({
    name: app.studentNumber,
    "Average Mark": app.averageMark,
    "Income": app.income,
    "NSFAS Funded": app.nsfasFunded ? 1 : 0,
    fill: isEligible(app) ? "#4caf50" : "#f44336"
  }));

  const COLORS = ["#4caf50", "#f44336", "#2196f3"];

  const exportToPDF = () => {
    const input = document.getElementById("report-section");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard-report.pdf");
    });
  };

  const handlePrint = () => {
    const printContents = document.getElementById("report-section").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const csvHeaders = [
    { label: "Student Number", key: "studentNumber" },
    { label: "Surname", key: "surname" },
    { label: "Initials", key: "initials" },
    { label: "NSFAS Funded", key: "nsfasFunded" },
    { label: "Average Mark", key: "averageMark" },
    { label: "Income", key: "income" },
    { label: "Course", key: "course" },
    { label: "Year of Study", key: "yearOfStudy" },
    { label: "Recommendation Letter", key: "recommendationLetter" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 overflow-hidden">
      <AdminNavbar />
      <div className="container my-4 flex-grow-1">
        <h1 className="text-center fw-bold mb-4">Admin Dashboard</h1>

        <div className="d-flex justify-content-end gap-2 mb-3">
          <button onClick={handlePrint} className="btn btn-secondary">🖨️ Print</button>
          <button onClick={exportToPDF} className="btn btn-danger">📄 Export PDF</button>
          <CSVLink
            data={applications}
            headers={csvHeaders}
            filename="dashboard-data.csv"
            className="btn btn-success"
          >📥 Export CSV</CSVLink>
        </div>

        <div id="report-section">
          <div className="row justify-content-center mb-4">
            <PieChart width={600} height={250} className="mx-auto">
              <Pie
                data={pieData}
                cx={280}
                cy={120}
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </div>

          <div className="row mb-3">
            <h4 className="text-center mb-3">Student Metrics (Average Mark, Income & NSFAS)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Average Mark" fill="#00C49F" />
                <Bar dataKey="Income" fill="#FFBB28" />
                <Bar dataKey="NSFAS Funded" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}