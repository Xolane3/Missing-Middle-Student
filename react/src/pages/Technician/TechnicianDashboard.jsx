import React, { useState } from "react";
import TechNavBar from "../../components/technicianNavbar";
import { Toaster } from "react-hot-toast";
import "../../App.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function TechnicianDashboard() {
  const [devices] = useState([
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
    {
      id: 3,
      name: "HP EliteBook 840",
      model: "840 G6",
      serialNumber: "MK-U12K",
      condition: "Fair",
      status: "Ready for Distribution",
      dateAdded: "2025-01-10",
      allocated: false,
    },
  ]);

  // Stats Calculation
  const totalDevices = devices.length;
  const allocatedDevices = devices.filter((device) => device.allocated).length;
  const unallocatedDevices = totalDevices - allocatedDevices;

  // Device Conditions Count
  const conditionCount = devices.reduce(
    (acc, device) => {
      acc[device.condition] = (acc[device.condition] || 0) + 1;
      return acc;
    },
    {}
  );

  // Device Status Count
  const statusCount = devices.reduce(
    (acc, device) => {
      acc[device.status] = (acc[device.status] || 0) + 1;
      return acc;
    },
    {}
  );

  // Chart Data for Device Conditions
  const conditionData = {
    labels: ["Good", "Fair", "Needs Repair", "Broken"],
    datasets: [
      {
        label: "Device Conditions",
        data: [
          conditionCount["Good"] || 0,
          conditionCount["Fair"] || 0,
          conditionCount["Needs Repair"] || 0,
          conditionCount["Broken"] || 0,
        ],
        backgroundColor: ["#28a745", "#ffc107", "#fd7e14", "#dc3545"],
      },
    ],
  };

  // Chart Data for Device Status
  const statusData = {
    labels: ["Pending", "In Progress", "Ready for Distribution", "Repaired", "Distributed"],
    datasets: [
      {
        label: "Device Status",
        data: [
          statusCount["Pending"] || 0,
          statusCount["In Progress"] || 0,
          statusCount["Ready for Distribution"] || 0,
          statusCount["Repaired"] || 0,
          statusCount["Distributed"] || 0,
        ],
        backgroundColor: ["#6c757d", "#ffc107", "#17a2b8", "#28a745", "#343a40"],
      },
    ],
  };

  return (
    <div className="min-vh-100 bg-light">
      <TechNavBar />
      <Toaster position="top-center" />

      <div className="container py-5">
        <h2 className="mb-4 text-primary">Technician Dashboard</h2>

        {/* Stats Section */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Total Devices</h5>
                <p className="card-text">{totalDevices}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Allocated Devices</h5>
                <p className="card-text">{allocatedDevices}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Unallocated Devices</h5>
                <p className="card-text">{unallocatedDevices}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mb-5">
          <div className="col-md-6">
            <h4>Device Conditions</h4>
            <Bar
  data={conditionData}
  options={{
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(
          conditionCount["Good"] || 0,
          conditionCount["Fair"] || 0,
          conditionCount["Needs Repair"] || 0,
          conditionCount["Broken"] || 0
        ) + 5, // Add padding above the max count
        ticks: {
          stepSize: 10, // Adjust based on expected range
        },
        title: {
          display: true,
          text: "Number of Devices",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }}
/>
          </div>
          <div className="col-md-6">
            <h4>Device Status</h4>
            <Pie data={statusData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
}
