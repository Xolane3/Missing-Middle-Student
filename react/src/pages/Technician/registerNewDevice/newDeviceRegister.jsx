import React, { useState } from 'react';
import TechNavBar from '../../../components/technicianNavbar';
import { Toaster, toast } from 'react-hot-toast';
import { FaLaptop, FaTools, FaSearch } from 'react-icons/fa'; // Importing icons

const NewDeviceRegister = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceCondition, setDeviceCondition] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deviceName') setDeviceName(value);
    if (name === 'deviceType') setDeviceType(value);
    if (name === 'serialNumber') setSerialNumber(value);
    if (name === 'deviceCondition') setDeviceCondition(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate registration logic
    console.log('Registering device:', {
      deviceName,
      deviceType,
      serialNumber,
      deviceCondition,
    });

    toast.success(`✅ "${deviceName}" registered successfully!`);

    // Clear form
    setDeviceName('');
    setDeviceType('');
    setSerialNumber('');
    setDeviceCondition('');
  };

  return (
    <div className="min-vh-100 bg-gradient-to-r from-blue-200 via-blue-300 to-white">
      <TechNavBar />
      <Toaster position="top-right" />

      <div className="container py-5">
        <div className="bg-white p-5 rounded-xl shadow-2xl border border-primary">
          <h2 className="text-center text-primary mb-4 font-bold text-3xl">
            Register New Device
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Device Name */}
            <div className="mb-3">
              <label className="form-label text-dark">
                <FaLaptop className="me-2" /> Device Name
              </label>
              <input
                type="text"
                name="deviceName"
                value={deviceName}
                onChange={handleInputChange}
                placeholder="e.g. Dell Latitude 7490"
                required
                className="form-control form-control-sm w-50 shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Device Type */}
            <div className="mb-3">
              <label className="form-label text-dark">
                <FaTools className="me-2" /> Device Type
              </label>
              <input
                type="text"
                name="deviceType"
                value={deviceType}
                onChange={handleInputChange}
                placeholder="e.g. Laptop"
                required
                className="form-control form-control-sm w-50 shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Serial Number */}
            <div className="mb-3">
              <label className="form-label text-dark">
                <FaSearch className="me-2" /> Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                value={serialNumber}
                onChange={handleInputChange}
                placeholder="e.g. SN-123456"
                required
                className="form-control form-control-sm w-50 shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Device Condition */}
            <div className="mb-3">
              <label className="form-label text-dark">Condition</label>
              <select
                name="deviceCondition"
                value={deviceCondition}
                onChange={handleInputChange}
                required
                className="form-select form-select-sm w-50 shadow-sm border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Condition --</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Needs Repair">Needs Repair</option>
                <option value="Broken">Broken</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-sm w-40 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register Device
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewDeviceRegister;
