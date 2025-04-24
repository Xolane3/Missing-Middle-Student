import React, { useState } from 'react';

const AssignDevice = () => {
  // Sample data (in real-world, this would come from your backend)
  const applicantsData = [
    { id: 1, name: "Applicant 1", approvedDate: "2025-04-20", assigned: false, deviceId: null },
    { id: 2, name: "Applicant 2", approvedDate: "2025-04-18", assigned: false, deviceId: null },
    { id: 3, name: "Applicant 3", approvedDate: "2025-04-22", assigned: false, deviceId: null },
  ];

  const devicesData = [
    { id: 1, name: "Device 1", assigned: false, applicantId: null },
    { id: 2, name: "Device 2", assigned: false, applicantId: null },
    { id: 3, name: "Device 3", assigned: false, applicantId: null },
  ];

  // State to manage applicants and devices
  const [applicants, setApplicants] = useState(applicantsData);
  const [devices, setDevices] = useState(devicesData);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [assignedDevices, setAssignedDevices] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // All/Assigned/Unassigned
  const [sortByDate, setSortByDate] = useState(false); // Sort applicants by approval date
  const [errorMessage, setErrorMessage] = useState('');

  // Handle selection of applicants and devices
  const handleApplicantSelect = (applicantId) => {
    setSelectedApplicants((prev) => {
      if (prev.includes(applicantId)) {
        return prev.filter(id => id !== applicantId);  // Deselect
      }
      return [...prev, applicantId];  // Select
    });
  };

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevices((prev) => {
      if (prev.includes(deviceId)) {
        return prev.filter(id => id !== deviceId);  // Deselect
      }
      return [...prev, deviceId];  // Select
    });
  };

  // Handle assigning the selected devices to applicants
  const handleAssign = () => {
    // Validation: Ensure the number of selected applicants equals the number of selected devices
    if (selectedApplicants.length !== selectedDevices.length) {
      setErrorMessage('The number of selected applicants must match the number of selected devices.');
      return;
    }

    // Validation: Ensure selected applicants and devices are unassigned
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

    // Perform assignment if validation passes
    const newAssignments = selectedApplicants.map((applicantId, index) => {
      const applicant = applicants.find((app) => app.id === applicantId);
      const device = devices.find((dev) => dev.id === selectedDevices[index]);

      // Assign the device to the applicant
      return {
        applicantId,
        deviceId: device.id,
        applicantName: applicant.name,
        deviceName: device.name,
      };
    });

    // Update state with new assignments
    setAssignedDevices((prevAssignments) => [...prevAssignments, ...newAssignments]);

    // Mark devices and applicants as assigned
    const updatedApplicants = applicants.map(applicant =>
      selectedApplicants.includes(applicant.id)
        ? { ...applicant, assigned: true, deviceId: selectedDevices[selectedApplicants.indexOf(applicant.id)] }
        : applicant
    );

    const updatedDevices = devices.map(device =>
      selectedDevices.includes(device.id)
        ? { ...device, assigned: true, applicantId: selectedApplicants[selectedDevices.indexOf(device.id)] }
        : device
    );

    setApplicants(updatedApplicants);
    setDevices(updatedDevices);

    // Reset selected applicants and devices after assignment
    setSelectedApplicants([]);
    setSelectedDevices([]);
    setErrorMessage('');
  };

  // Filter applicants based on assignment status
  const filteredApplicants = applicants.filter(applicant => {
    if (filterStatus === 'assigned') return applicant.assigned;
    if (filterStatus === 'unassigned') return !applicant.assigned;
    return true; // all applicants if no filter
  });

  // Sort applicants by approval date
  const sortedApplicants = sortByDate
    ? [...filteredApplicants].sort((a, b) => new Date(a.approvedDate) - new Date(b.approvedDate))
    : filteredApplicants;

  // Filter devices based on assignment status
  const filteredDevices = devices.filter(device => {
    if (filterStatus === 'assigned') return device.assigned;
    if (filterStatus === 'unassigned') return !device.assigned;
    return true; // all devices if no filter
  });

  return (
    <div className="assign-device" style={{ padding: '20px' }}>
      <h2>Assign Devices</h2>

      {/* Error message */}
      {errorMessage && <div style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</div>}

      {/* Filters and buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setAssignedDevices([])}>Reset</button>
        <div>
          <label>
            Filter by Status:
            <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
              <option value="all">All</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </label>
          <label>
            Sort by Approval Date:
            <input
              type="checkbox"
              checked={sortByDate}
              onChange={() => setSortByDate(!sortByDate)}
            />
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* Applicants Table */}
        <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <h4>Applicants</h4>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f7f7f7' }}>
              <tr>
                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Applicant Name</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Assigned Device</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Select</th>
              </tr>
            </thead>
            <tbody>
              {sortedApplicants.map((applicant) => {
                const assignedDevice = devices.find(device => device.id === applicant.deviceId);
                return (
                  <tr
                    key={applicant.id}
                    style={{
                      textDecoration: applicant.assigned ? 'line-through' : 'none',
                      color: applicant.assigned ? 'gray' : 'black',
                      backgroundColor: selectedApplicants.includes(applicant.id) ? '#e0f7fa' : '',
                    }}
                  >
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{applicant.name}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                      {assignedDevice ? assignedDevice.name : 'Not Assigned'}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
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

        {/* Devices Table */}
        <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <h4>Devices</h4>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f7f7f7' }}>
              <tr>
                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Device Name</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Assigned Applicant</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #ddd' }}>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => {
                const assignedApplicant = applicants.find(applicant => applicant.id === device.applicantId);
                return (
                  <tr
                    key={device.id}
                    style={{
                      textDecoration: device.assigned ? 'line-through' : 'none',
                      color: device.assigned ? 'gray' : 'black',
                      backgroundColor: selectedDevices.includes(device.id) ? '#e0f7fa' : '',
                    }}
                  >
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{device.name}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                      {assignedApplicant ? assignedApplicant.name : 'Not Assigned'}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
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

      {/* Assign Button */}
      <button onClick={handleAssign} style={{ marginTop: '20px' }} disabled={selectedApplicants.length === 0 || selectedDevices.length === 0}>
        Assign
      </button>
    </div>
  );
};

export default AssignDevice;
