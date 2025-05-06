import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AdminNavbar from '../../../components/adminNavBar';
import AdminFooter from '../../../components/adminFooter';

export default function AssignDevicePage() {
  const [applications, setApplications] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([
    'Dell Latitude 7490',
    'HP ProBook 450 G7',
    'Lenovo ThinkPad E15',
    'Acer Aspire 5',
  ]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        studentNumber: '2023123456',
        surname: 'Mokoena',
        initials: 'T.',
        approvalDate: '2025-04-20',
        device: '',
      },
      {
        id: 2,
        studentNumber: '2023987654',
        surname: 'Dlamini',
        initials: 'L.',
        approvalDate: '2025-04-18',
        device: 'Dell Latitude 7490',
      },
      {
        id: 3,
        studentNumber: '2023765432',
        surname: 'Ndlovu',
        initials: 'S.',
        approvalDate: '2025-04-23',
        device: '',
      },
    ];
    setApplications(dummyData);
  }, []);

  const handleAssignDevice = (id) => {
    Swal.fire({
      title: 'Select a Device',
      input: 'select',
      inputOptions: availableDevices.reduce((acc, device) => {
        acc[device] = device;
        return acc;
      }, {}),
      inputPlaceholder: 'Choose a device',
      showCancelButton: true,
      confirmButtonText: 'Assign',
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedDevice = result.value;
        setApplications((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, device: selectedDevice } : app
          )
        );
        Swal.fire('Assigned!', `Device '${selectedDevice}' assigned.`, 'success');
      }
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Assign Devices</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-light">
              <tr>
                <th>Student Number</th>
                <th>Surname</th>
                <th>Initials</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Assign Device</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.studentNumber}</td>
                  <td>{app.surname}</td>
                  <td>{app.initials}</td>
                  <td>{app.approvalDate}</td>
                  <td>{app.device ? 'Assigned' : 'Unassigned'}</td>
                  <td>
                    {app.device ? (
                      app.device
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAssignDevice(app.id)}
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-auto">
        <AdminFooter />
      </div>
    </div>
  );
}
