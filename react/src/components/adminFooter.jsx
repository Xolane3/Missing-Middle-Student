import React from 'react';
import { Bell, User } from 'lucide-react';
import { Link } from "react-router-dom";

export default function AdminFooter() {
  return (
    <footer className="mt-auto bg-light border-top py-3 w-100">
      <div className="container d-flex justify-content-between align-items-center position-relative">
        {/* Left: Notification Icon 
        <div className="position-absolute start-0">
          <Link to="/admin/notifications" className="nav-link">
            <Bell />
          </Link>
        </div>
        */}

        {/* Center: Admin Text */}
        <div className="mx-auto">
          <p className="mb-0 fw-medium text-center">admin</p>
        </div>

        {/* Right: Profile Icon */}
        <div className="position-absolute end-0">
          <User className="text-secondary" />
        </div>
      </div>
    </footer>
  );
}
