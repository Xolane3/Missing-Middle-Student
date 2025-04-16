import React from 'react';
import AdminNavbar from '../../components/adminNavBar';
export default function Dashboard() {
  return (
    <div className="p-6">
      <AdminNavbar />
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">Welcome! Use the navbar to navigate.</p>
    </div>
  );
}