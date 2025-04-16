import React, { useState } from "react";
import TechNavBar from "../../components/technicianNavbar";

export default function TechnicianDashboard() {
  const [devices, setDevices] = useState([
    { id: 1, name: "Dell Latitude 7490", model: "7490",serialNumber: "MS-U13kK",condition:"Good", status: "Repaired" },
    { id: 2, name: "HP EliteBook 840", model: "840 G5",serialNumber: "MK-UO3K",condition:"Good", status: "In Progress" },
  ]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };


  const handleStatusChange = (deviceId, newStatus) => {
    const device = devices.find((d) => d.id === deviceId);
    const confirmed = window.confirm(
      `Are you sure you want to change the status of "${device.name}" to "${newStatus}"?`
    );

    if (confirmed) {
      const updatedDevices = devices.map((device) =>
        device.id === deviceId ? { ...device, status: newStatus } : device
      );
      setDevices(updatedDevices);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TechNavBar />

      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-black 2xl">Technician Dashboard</h1>
      </header>
      <main className="p-4">
       

        {/* Device List */}
        <section className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Available Laptop Devices</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Device Name</th>
                <th className="p-2">Model</th>
                <th className="p-2">Serial Number</th>
                <th className="p-2">Condition</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr
                  key={device.id}
                className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <td className="p-2">{device.id}</td>
                  <td className="p-2">{device.name}</td>
                  <td className="p-2">{device.model}</td>
                  <td className="p-2">{device.serialNumber}</td>
                  <td className="p-2">{device.condition}</td>
                  <td className="p-2">
                    <select
                      value={device.status}
                      onChange={(e) =>
                        handleStatusChange(device.id, e.target.value)
                      }
                   
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Ready for Distributon">Ready for Distribution</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
