import React, { useState } from 'react';
import AdminNavbar from '../../../components/adminNavBar';
import AdminFooter from '../../../components/adminFooter'; // ✅ Import footer

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Laptop Application',
            message: 'Missing ID document.',
            read: false,
            type: 'Task',
            studentName: 'John Doe',
            applicationDate: '2025-04-10',
            uploadedDocuments: {
                ID: false,
                ProofOfRegistration: true,
                FinancialStatement: true,
            },
        },
        {
            id: 2,
            title: 'New Announcement',
            message: 'The Science fair will be held on 20th October.',
            read: false,
            type: 'Announcement',
        },
        {
            id: 3,
            title: 'Event Reminder',
            message: "Don't forget to collect your laptop before 20th October 2025.",
            read: false,
            type: 'Event',
        },
        {
            id: 4,
            title: 'Laptop Application',
            message: 'All documents submitted.',
            read: false,
            type: 'Task',
            studentName: 'Jane Smith',
            applicationDate: '2025-04-12',
            uploadedDocuments: {
                ID: true,
                ProofOfRegistration: true,
                FinancialStatement: true,
            },
        },
    ]);

    const [filter, setFilter] = useState('All');

    const handleNotificationClick = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const handleDismiss = (id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    const handleMarkAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, read: true }))
        );
    };

    const filteredNotifications = notifications.filter((notif) => {
        if (filter === 'Unread') return !notif.read;
        return true;
    });

    const renderUploadedDocuments = (docs) => {
        return Object.entries(docs).map(([key, value]) => (
            <li key={key} style={{ color: value ? 'green' : 'red' }}>
                {key}: {value ? 'Uploaded' : 'Missing'}
            </li>
        ));
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="p-4">
                <AdminNavbar />
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1>
                        Notifications{' '}
                        <span style={{ fontSize: '16px', color: '#555' }}>
                            ({notifications.filter((n) => !n.read).length} unread)
                        </span>
                    </h1>

                    <div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                marginRight: '10px',
                                padding: '5px',
                                borderRadius: '5px'
                            }}
                        >
                            <option value="All">All</option>
                            <option value="Unread">Unread</option>
                        </select>

                        <button
                            onClick={handleMarkAllAsRead}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: 'none',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            Mark All as Read
                        </button>
                    </div>
                </div>

                <div style={{ padding: '0 20px' }}>
                    {filteredNotifications.length === 0 ? (
                        <p style={{ color: '#777' }}>No notifications to display.</p>
                    ) : (
                        filteredNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                onClick={() => handleNotificationClick(notif.id)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    backgroundColor: notif.read ? '#e6e6e6' : '#fff',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    boxShadow: notif.read
                                        ? 'none'
                                        : '0 2px 5px rgba(0, 0, 0, 0.1)'
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = notif.read
                                        ? '#dcdcdc'
                                        : '#f9f9f9')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = notif.read
                                        ? '#e6e6e6'
                                        : '#fff')
                                }
                            >
                                <div style={{ width: '100%' }}>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{notif.title}</h3>
                                    <p style={{ margin: '0 0 8px 0', color: '#555' }}>{notif.message}</p>

                                    {notif.type === 'Task' && notif.studentName && (
                                        <div
                                            style={{
                                                backgroundColor: '#f4f4f4',
                                                padding: '10px',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <p><strong>Student Name:</strong> {notif.studentName}</p>
                                            <p><strong>Application Date:</strong> {notif.applicationDate}</p>
                                            <p><strong>Uploaded Documents:</strong></p>
                                            <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                                                {renderUploadedDocuments(notif.uploadedDocuments)}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div style={{ alignSelf: 'flex-end', marginTop: '10px' }}>
                                    {notif.read && (
                                        <small style={{ color: 'green', marginRight: '10px' }}>
                                            ✓ Read
                                        </small>
                                    )}
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDismiss(notif.id);
                                        }}
                                        style={{
                                            color: '#999',
                                            fontWeight: 'bold',
                                            fontSize: '18px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ✕
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-auto">
                <AdminFooter />
            </div>
        </div>
    );
};

export default Notifications;
