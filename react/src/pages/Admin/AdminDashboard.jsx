import React from "react";
import AdminNavbar from "../../components/adminNavBar";
import AdminFooter from "../../components/adminFooter";

export default function Dashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="p-4">
        <AdminNavbar />

        <div className="container text-center mt-4">
          <h1 className="fw-bold">Admin Dashboard</h1>
          <p className="mt-2">Welcome! Use the navbar to navigate.</p>
        </div>
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
}
