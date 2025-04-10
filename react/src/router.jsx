import { createBrowserRouter } from "react-router-dom";
import StudentLogin from "./pages/Student/StudentLogin";
import StudentSignup from "./pages/Student/StudentSignup";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import TechnicianLogin from "./pages/Technician/TechnicianLogin";
import TechnicianDashboard from "./pages/Technician/TechnicianDashboard";

export const router = createBrowserRouter([
  { path: "/", element: <StudentLogin /> },
  { path: "/student/login", element: <StudentLogin /> },
  { path: "/student/signup", element: <StudentSignup /> },
  { path: "/student/dashboard", element: <StudentDashboard /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/technician/login", element: <TechnicianLogin /> },
  { path: "/technician/dashboard", element: <TechnicianDashboard /> },
]);
