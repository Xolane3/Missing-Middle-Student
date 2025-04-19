import React, { useState } from "react";
import TechNavBar from "../../components/technicianNavbar";
import { toast, Toaster } from "react-hot-toast";
import {
  FaLaptop,
  FaCheckCircle,
  FaHourglassHalf,
  FaTools,
  FaUserCheck,
  FaUserSlash,
  FaCalendarAlt,
} from "react-icons/fa";

export default function TechnicianDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Dell Latitude 7490",
      model: "7490",
      serialNumber: "MS-U13kK",
      condition: "Good",
      status: "Distributed",
      dateAdded: "2024-12-05",
      allocated: true,
    },
    {
      id: 2,
      name: "HP EliteBook 840",
      model: "840 G5",
      serialNumber: "MK-UO3K",
      condition: "Good",
      status: "In Progress",
      dateAdded: "2025-01-10",
      allocated: false,
    },
  ]);

  const handleStatusChange = (deviceId, newStatus) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === deviceId) {
        if (device.allocated) {
          toast.error("🚫 Status cannot be changed. Device is already allocated.");
          return device;
        }

        if (device.condition === "Broken" && newStatus === "Ready for Distribution") {
          toast.error("❌ Cannot set status to 'Ready for Distribution' if condition is 'Broken'");
          return device;
        }

        toast.success(` Status updated to "${newStatus}"`);
        return { ...device, status: newStatus };
      }
      return device;
    });
    setDevices(updatedDevices);
  };

  const handleConditionChange = (deviceId, newCondition) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === deviceId) {
        if (device.allocated) {
          toast.error("🚫 Condition cannot be changed. Device is already allocated.");
          return device;
        }

        toast.success(`✅ Condition updated to "${newCondition}"`);
        return { ...device, condition: newCondition };
      }
      return device;
    });
    setDevices(updatedDevices);
  };

  const filteredDevices = devices.filter((device) =>
    `${device.name} ${device.serialNumber} ${device.model}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const statusBadge = (status) => {
    const base =
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ease-in-out";
    switch (status) {
      case "Repaired":
        return (
          <span className={`${base} bg-success text-white`} key="Repaired">
            <FaCheckCircle className="mr-1" /> Repaired
          </span>
        );
      case "In Progress":
        return (
          <span className={`${base} bg-warning text-white`} key="InProgress">
            <FaHourglassHalf className="mr-1" /> In Progress
          </span>
        );
      case "Pending":
        return (
          <span className={`${base} bg-secondary text-white`} key="Pending">
            <FaTools className="mr-1" /> Pending
          </span>
        );
      case "Ready for Distribution":
        return (
          <span className={`${base} bg-info text-white`} key="Ready">
            <FaLaptop className="mr-1" /> Ready
          </span>
        );
      case "Distributed":
        return (
          <span className={`${base} bg-dark text-white`} key="Distributed">
            <FaLaptop className="mr-1" /> Distributed
          </span>
        );
      default:
        return <span className={base}>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-light via-blue-50 to-white text-gray-800">
      <TechNavBar />
      <Toaster position="top-center" />

      <header className="bg-primary text-white py-6 shadow-md">
        <div className="container">
          <h1 className="text-3xl font-bold tracking-tight">Technician Dashboard</h1>
        </div>
      </header>

      <main className="container py-10">
        <section className="bg-white p-6 rounded-xl shadow-lg border border-primary">
          <h2 className="text-2xl font-semibold mb-6 text-dark">Laptop Devices</h2>

          {/* Search */}
          <div className="mb-4 row">
            <div className="col-sm-8 col-md-6 mx-auto">
              <input
                type="text"
                placeholder="Search by name, model, or serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control form-control-sm"
              />
            </div>
          </div>

          {/* Devices */}
          <div className="row">
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <div key={device.id} className="col-12 mb-4">
                  <div className="card shadow-sm border-primary">
                    <div className="card-body d-flex flex-column justify-between">
                      <div className="d-flex gap-3">
                        <FaLaptop className="text-primary" size={40} />
                        <div>
                          <h5 className="card-title">{device.name}</h5>
                          <p className="card-text text-muted">
                            Model: {device.model} <br />
                            SN: {device.serialNumber}
                          </p>

                          {/* Condition Selector */}
                          <div className="text-sm text-dark mb-2">
                            <label className="fw-semibold me-2">Condition:</label>
                            <select
                              value={device.condition}
                              onChange={(e) =>
                                handleConditionChange(device.id, e.target.value)
                              }
                              className="form-select form-select-sm w-auto d-inline-block"
                              disabled={device.allocated}
                            >
                              <option value="Good">Good</option>
                              <option value="Fair">Fair</option>
                              <option value="Needs Repair">Needs Repair</option>
                              <option value="Broken">Broken</option>
                            </select>
                          </div>

                          {/* Date & Allocation */}
                          <div className="text-muted">
                            <FaCalendarAlt className="me-2" />
                            Added on:{" "}
                            {new Date(device.dateAdded).toLocaleDateString()}
                          </div>
                          <div className="text-muted">
                            {device.allocated ? (
                              <>
                                <FaUserCheck className="text-success me-2" />
                                <span className="text-success">Allocated</span>
                              </>
                            ) : (
                              <>
                                <FaUserSlash className="text-danger me-2" />
                                <span className="text-danger">Unallocated</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status & Controls */}
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        {statusBadge(
                          device.allocated ? "Distributed" : device.status
                        )}
                        <select
                          value={device.allocated ? "Distributed" : device.status}
                          onChange={(e) =>
                            handleStatusChange(device.id, e.target.value)
                          }
                          className="form-select form-select-sm w-auto"
                          disabled={device.allocated}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Ready for Distribution">
                            Ready for Distribution
                          </option>
                          <option value="Repaired">Repaired</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-4 text-muted">
                No matching devices found.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
