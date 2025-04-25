import React, { useState } from 'react';
import DistriNavBar from '../../../components/distributorNavBar';

const AssignDevice = () => {
  const applicantsData = [
    { id: 1, name: "Applicant 1", approvedDate: "2025-04-20", assigned: false, deviceId: null, assignedDate: null },
    { id: 2, name: "Applicant 2", approvedDate: "2025-04-18", assigned: false, deviceId: null, assignedDate: null },
    { id: 3, name: "Applicant 3", approvedDate: "2025-04-22", assigned: false, deviceId: null, assignedDate: null },
  ];

  const devicesData = [
    { id: 1, name: "Device 1", serialNumber: "SN12345", condition: "Good", assigned: false, applicantId: null },
    { id: 2, name: "Device 2", serialNumber: "SN12346", condition: "Fair", assigned: false, applicantId: null },
    { id: 3, name: "Device 3", serialNumber: "SN12347", condition: "Good", assigned: false, applicantId: null },
  ];

  const [applicants, setApplicants] = useState(applicantsData);
  const [devices, setDevices] = useState(devicesData);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [assignedDevices, setAssignedDevices] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortByDate, setSortByDate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);

  const handleApplicantSelect = (applicantId) => {
    setSelectedApplicants((prev) => {
      if (prev.includes(applicantId)) {
        return prev.filter(id => id !== applicantId);
      }
      return [...prev, applicantId];
    });
  };

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevices((prev) => {
      if (prev.includes(deviceId)) {
        return prev.filter(id => id !== deviceId);
      }
      return [...prev, deviceId];
    });
  };

  const handleAssign = () => {
    if (selectedApplicants.length !== selectedDevices.length) {
      setErrorMessage('The number of selected applicants must match the number of selected devices.');
      return;
    }

    const unassignedApplicants = selectedApplicants.filter(id => !applicants.find(app => app.id === id).assigned);
    const unassignedDevices = selectedDevices.filter(id => !devices.find(dev => dev.id === id).assigned);

    if (unassignedApplicants.length !== selectedApplicants.length) {
      setErrorMessage('Some of the selected applicants are already assigned.');
      return;
    }

    if (unassignedDevices.length !== selectedDevices.length) {
      setErrorMessage('Some of the selected devices are already assigned.');
      return;
    }

    const newAssignments = selectedApplicants.map((applicantId, index) => {
      const applicant = applicants.find((app) => app.id === applicantId);
      const device = devices.find((dev) => dev.id === selectedDevices[index]);

      return {
        applicantId,
        deviceId: device.id,
        applicantName: applicant.name,
        deviceName: device.name,
        assignedDate: new Date().toISOString(),
      };
    });

    setAssignedDevices((prevAssignments) => [...prevAssignments, ...newAssignments]);

    const updatedApplicants = applicants.map(applicant =>
      selectedApplicants.includes(applicant.id)
        ? { ...applicant, assigned: true, deviceId: selectedDevices[selectedApplicants.indexOf(applicant.id)], assignedDate: new Date().toISOString() }
        : applicant
    );

    const updatedDevices = devices.map(device =>
      selectedDevices.includes(device.id)
        ? { ...device, assigned: true, applicantId: selectedApplicants[selectedDevices.indexOf(device.id)] }
        : device
    );

    setApplicants(updatedApplicants);
    setDevices(updatedDevices);

    setSelectedApplicants([]);
    setSelectedDevices([]);
    setErrorMessage('');
  };

  const filteredApplicants = applicants.filter(applicant => {
    if (filterStatus === 'assigned') return applicant.assigned;
    if (filterStatus === 'unassigned') return !applicant.assigned;
    return true;
  });

  const sortedApplicants = sortByDate
    ? [...filteredApplicants].sort((a, b) => new Date(a.approvedDate) - new Date(b.approvedDate))
    : filteredApplicants;

  const filteredDevices = devices.filter(device => {
    if (filterStatus === 'assigned') return device.assigned;
    if (filterStatus === 'unassigned') return !device.assigned;
    return true;
  });

  const openApplicantModal = (applicant) => {
    setCurrentApplicant(applicant);
    setShowApplicantModal(true);
  };

  const openDeviceModal = (device) => {
    setCurrentDevice(device);
    setShowDeviceModal(true);
  };

  const closeModals = () => {
    setShowApplicantModal(false);
    setShowDeviceModal(false);
  };

  return (
    <div className="assign-device" style={styles.container}>
      <DistriNavBar />
      <h2 style={styles.title}>Assign Devices</h2>

      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

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
            Sort by Approval Date:
            <input
              type="checkbox"
              checked={sortByDate}
              onChange={() => setSortByDate(!sortByDate)}
              style={styles.checkbox}
            />
          </label>
        </div>
      </div>

      <div style={styles.tablesContainer}>
        <div style={styles.tableContainer}>
          <h4>Applicants</h4>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Applicant Name</th>
                <th style={styles.tableHeaderCell}>Approval Date</th>
                <th style={styles.tableHeaderCell}>Assigned Device</th>
                <th style={styles.tableHeaderCell}>Assigned Date</th>
                <th style={styles.tableHeaderCell}>Select</th>
              </tr>
            </thead>
            <tbody>
              {sortedApplicants.map((applicant) => {
                const assignedDevice = devices.find(device => device.id === applicant.deviceId);
                return (
                  <tr
                    key={applicant.id}
                    style={{
                      ...styles.tableRow,
                      textDecoration: applicant.assigned ? 'line-through' : 'none',
                      backgroundColor: selectedApplicants.includes(applicant.id) ? '#e0f7fa' : '',
                    }}
                  >
                    <td style={styles.tableCell} onClick={() => openApplicantModal(applicant)}>{applicant.name}</td>
                    <td style={styles.tableCell}>{applicant.approvedDate}</td>
                    <td style={styles.tableCell}>{assignedDevice ? assignedDevice.name : 'Not Assigned'}</td>
                    <td style={styles.tableCell}>
                      {applicant.assignedDate ? new Date(applicant.assignedDate).toLocaleString() : 'Not Assigned'}
                    </td>
                    <td style={styles.tableCell}>
                      <input
                        type="checkbox"
                        disabled={applicant.assigned}
                        onChange={() => handleApplicantSelect(applicant.id)}
                        checked={selectedApplicants.includes(applicant.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={styles.tableContainer}>
          <h4>Devices</h4>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Device Name</th>
                <th style={styles.tableHeaderCell}>Assigned Applicant</th>
                <th style={styles.tableHeaderCell}>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => {
                const assignedApplicant = applicants.find(applicant => applicant.id === device.applicantId);
                return (
                  <tr
                    key={device.id}
                    style={{
                      ...styles.tableRow,
                      textDecoration: device.assigned ? 'line-through' : 'none',
                      backgroundColor: selectedDevices.includes(device.id) ? '#e0f7fa' : '',
                    }}
                  >
                    <td style={styles.tableCell} onClick={() => openDeviceModal(device)}>{device.name}</td>
                    <td style={styles.tableCell}>{assignedApplicant ? assignedApplicant.name : 'Not Assigned'}</td>
                    <td style={styles.tableCell}>
                      <input
                        type="checkbox"
                        disabled={device.assigned}
                        onChange={() => handleDeviceSelect(device.id)}
                        checked={selectedDevices.includes(device.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handleAssign}
        style={styles.assignButton}
        disabled={selectedApplicants.length === 0 || selectedDevices.length === 0}
      >
        Assign
      </button>

      {/* Applicant Modal */}
      {showApplicantModal && currentApplicant && (
        <div style={styles.modalBackdrop} onClick={closeModals}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Applicant Details</h3>
            <p><strong>Name:</strong> {currentApplicant.name}</p>
            <p><strong>Approved Date:</strong> {currentApplicant.approvedDate}</p>
            <p><strong>Assigned Device:</strong> {currentApplicant.deviceId ? devices.find(device => device.id === currentApplicant.deviceId).name : 'Not Assigned'}</p>
            <p><strong>Device Assigned Date:</strong> {currentApplicant.assignedDate ? new Date(currentApplicant.assignedDate).toLocaleString() : 'Not Assigned'}</p>
            <button onClick={closeModals} style={styles.closeModalButton}>Close</button>
          </div>
        </div>
      )}

      {/* Device Modal */}
      {showDeviceModal && currentDevice && (
        <div style={styles.modalBackdrop} onClick={closeModals}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Device Details</h3>
            <p><strong>Device Name:</strong> {currentDevice.name}</p>
            <p><strong>Serial Number:</strong> {currentDevice.serialNumber}</p>
            <p><strong>Condition:</strong> {currentDevice.condition}</p>
            <p><strong>Assigned Applicant:</strong> {currentDevice.applicantId ? applicants.find(applicant => applicant.id === currentDevice.applicantId).name : 'Not Assigned'}</p>
            <button onClick={closeModals} style={styles.closeModalButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for the page
const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '20px',
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
  checkbox: {
    marginLeft: '10px',
  },
  tablesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  tableContainer: {
    flex: 1,
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
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
  assignButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  closeModalButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default AssignDevice;
