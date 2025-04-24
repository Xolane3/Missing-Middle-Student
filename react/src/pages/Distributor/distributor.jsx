import React from 'react';
import DistriNavBar from '../../components/distributorNavBar';

const Distributor = () => {
    // Dummy data for the stats and actions
    const stats = {
        totalDevicesAssigned: 150,
        devicesReadyForDistribution: 30,
        devicesDistributed: 120
    };

    const recentActivities = [
        { id: 1, action: 'Assigned Device 123 to John Doe', timestamp: '2025-04-22 10:30 AM' },
        { id: 2, action: 'Updated status of Device 123 to "Distributed"', timestamp: '2025-04-22 11:00 AM' },
        { id: 3, action: 'Assigned Device 124 to Jane Smith', timestamp: '2025-04-23 02:00 PM' }
    ];

    return (
        <div className="distributor-page">
            {/* NavBar */}
            <DistriNavBar />

            <div style={{ padding: '20px' }}>
                <h1>Distributor Dashboard</h1>
                <p>Welcome to your distributor dashboard. Manage your distribution tasks and monitor progress below.</p>

                {/* Dashboard Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <div style={{ border: '1px solid #ccc', padding: '10px', width: '23%' }}>
                        <h3>Total Devices Assigned</h3>
                        <p>{stats.totalDevicesAssigned}</p>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '10px', width: '23%' }}>
                        <h3>Devices Ready for Distribution</h3>
                        <p>{stats.devicesReadyForDistribution}</p>
                    </div>
                  
                    <div style={{ border: '1px solid #ccc', padding: '10px', width: '23%' }}>
                        <h3>Devices Distributed</h3>
                        <p>{stats.devicesDistributed}</p>
                    </div>
                </div>

                {/* Pending Tasks / Actions */}
                <div style={{ marginTop: '20px' }}>
                    <h4>Pending Tasks</h4>
                    <ul>
                        <li>Assign devices to applicants</li>
                        
                    </ul>

                    {/* Call to Action Buttons */}
                    <div style={{ marginTop: '20px' }}>
                        <button
                            onClick={() => window.location.href = '/assign-device'}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '10px'
                            }}
                        >
                            Assign Device
                        </button>
                        <button
                            onClick={() => window.location.href = '/report-generation'}
                            style={{
                                backgroundColor: '#6c757d',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Generate Report
                        </button>
                    </div>
                </div>

                {/* Recent Activity / Audit Log */}
                <div style={{ marginTop: '30px' }}>
                    <h4>Recent Activities</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #ccc' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities.map((activity) => (
                                <tr key={activity.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                                    <td style={{ padding: '10px' }}>{activity.action}</td>
                                    <td style={{ padding: '10px' }}>{activity.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Distributor;
