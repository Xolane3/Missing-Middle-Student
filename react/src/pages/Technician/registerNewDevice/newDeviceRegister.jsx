import React, { useState, useEffect } from 'react';
import TechNavBar from '../../../components/technicianNavbar';

const NewDeviceRegister = () => {
    // State variables
    const [deviceName, setDeviceName] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [deviceCondition, setDeviceCondition] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');

    // Handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'deviceName') setDeviceName(value);
        if (name === 'deviceType') setDeviceType(value);
        if (name === 'serialNumber') setSerialNumber(value);
        if (name === 'deviceCondition') setDeviceCondition(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate device registration logic
        console.log('Registering device:', {
            deviceName,
            deviceType,
            serialNumber,
            deviceCondition,
        });

        // Show notification message
        alert('✅ Device registered successfully!');

        // Clear form
        setDeviceName('');
        setDeviceType('');
        setSerialNumber('');
        setDeviceCondition('');
    };

    // Auto-hide notification after 3 seconds
    useEffect(() => {
        if (registrationStatus) {
            const timer = setTimeout(() => {
                setRegistrationStatus('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [registrationStatus]);

    return (
        <div>
            <TechNavBar />
            <h1 className="text-xl font-semibold my-4">Register New Device</h1>

            {registrationStatus && (
                <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                    {registrationStatus}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                <div>
                    <label>Device Name:</label>
                    <input
                        type="text"
                        name="deviceName"
                        value={deviceName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label>Device Type:</label>
                    <input
                        type="text"
                        name="deviceType"
                        value={deviceType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label>Serial Number:</label>
                    <input
                        type="text"
                        name="serialNumber"
                        value={serialNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label>Condition:</label>
                    <input
                        type="text"
                        name="deviceCondition"
                        value={deviceCondition}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Register Device
                </button>
            </form>
        </div>
    );
};

export default NewDeviceRegister;
