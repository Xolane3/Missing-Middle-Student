import React, { useState } from 'react';
import DistriNavBar from '../../../components/distributorNavBar';
import { CSVLink } from "react-csv";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Use this import instead of relying on prototype


const GenerateReports = () => {
  const applicantsData = [
    { id: 1, name: "Applicant 1", approvedDate: "2025-04-20", assigned: true, deviceName: "Device 1", assignedDate: "2025-04-22" },
    { id: 2, name: "Applicant 2", approvedDate: "2025-04-18", assigned: false, deviceName: "", assignedDate: "" },
    { id: 3, name: "Applicant 3", approvedDate: "2025-04-22", assigned: true, deviceName: "Device 2", assignedDate: "2025-04-24" },
  ];

  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredApplicants, setFilteredApplicants] = useState(applicantsData);

  const handleGenerateReport = () => {
    let filteredData = applicantsData;

    if (filterStatus !== 'all') {
      filteredData = filteredData.filter(applicant => applicant.assigned === (filterStatus === 'assigned'));
    }

    if (startDate) {
      filteredData = filteredData.filter(applicant => new Date(applicant.approvedDate) >= new Date(startDate));
    }
    if (endDate) {
      filteredData = filteredData.filter(applicant => new Date(applicant.approvedDate) <= new Date(endDate));
    }

    setFilteredApplicants(filteredData);
  };

  const csvData = filteredApplicants.map(applicant => ({
    "Applicant Name": applicant.name,
    "Approved Date": applicant.approvedDate,
    "Assigned Device": applicant.deviceName || 'Not Assigned',
    "Assigned Date": applicant.assignedDate || 'Not Assigned',
  }));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    doc.text('Applicant Report', 14, 15);
  
    const tableColumn = ["Applicant Name", "Approved Date", "Assigned Device", "Assigned Date"];
    const tableRows = filteredApplicants.map(applicant => [
      applicant.name,
      applicant.approvedDate,
      applicant.deviceName || 'Not Assigned',
      applicant.assignedDate || 'Not Assigned'
    ]);
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("applicant_report.pdf");
  };
  

  return (
    <div style={styles.container}>
      <DistriNavBar />
      <h2 style={styles.title}>Generate Reports</h2>

      <div style={styles.filtersContainer}>
        <div>
          <label style={styles.label}>
            Filter by Status:
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              value={filterStatus}
              style={styles.select}
            >
              <option value="all">All</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </label>

          <label style={styles.label}>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
            />
          </label>

          <button onClick={handleGenerateReport} style={styles.generateButton}>Generate Report</button>
        </div>
      </div>

      {/* Download Buttons ABOVE the Table */}
      <div style={styles.downloadContainer}>
      <button onClick={handleDownloadPDF} style={{ ...styles.downloadButton, backgroundColor: '#dc3545', marginLeft: '10px' }}>
    Download as PDF
  </button>
        <CSVLink
          data={csvData}
          filename="applicant_report.csv"
          className="btn"
          style={{ ...styles.downloadButton, backgroundColor: '#17a2b8' }}
        >
          Download as CSV
        </CSVLink>
      </div>

      <div style={styles.tableContainer}>
        <h4>Preview Report</h4>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Applicant Name</th>
              <th style={styles.tableHeaderCell}>Approved Date</th>
              <th style={styles.tableHeaderCell}>Assigned Device</th>
              <th style={styles.tableHeaderCell}>Assigned Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <tr key={applicant.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{applicant.name}</td>
                  <td style={styles.tableCell}>{applicant.approvedDate}</td>
                  <td style={styles.tableCell}>{applicant.deviceName || 'Not Assigned'}</td>
                  <td style={styles.tableCell}>{applicant.assignedDate || 'Not Assigned'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.tableCell}>No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  filtersContainer: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '15px',
    fontWeight: 'bold',
  },
  select: {
    padding: '8px',
    marginLeft: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  input: {
    padding: '8px',
    marginLeft: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  generateButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: '10px',
    transition: 'background-color 0.3s',
  },
  tableContainer: {
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f7f7f7',
  },
  tableHeaderCell: {
    padding: '10px',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold',
  },
  tableRow: {
    color: 'black',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  downloadContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default GenerateReports;
