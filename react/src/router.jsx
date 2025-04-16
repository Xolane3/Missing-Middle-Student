import { createBrowserRouter } from "react-router-dom";
import StudentLogin from "./pages/Student/StudentLogin";
import StudentSignup from "./pages/Student/StudentSignup";
import StudentDashboard from "./pages/Student/StudentDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import TechnicianLogin from "./pages/Technician/TechnicianLogin";
import TechnicianDashboard from "./pages/Technician/TechnicianDashboard";
import Apply from "./pages/Student/apply-laptop/apply";
import ApplicationStatus from "./pages/Student/application-status/status";
import Notifications from "./pages/Student/notifications/notifications";
import TechNotification from "./pages/Technician/notifications/notification";
import NewDeviceRegister from "./pages/Technician/registerNewDevice/newDeviceRegister";



export const router = createBrowserRouter([
  { path: "/", element: <StudentLogin /> },
  { path: "/student/login", element: <StudentLogin /> },
  { path: "/student/signup", element: <StudentSignup /> },
  { path: "/student/dashboard", element: <StudentDashboard /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/technician/login", element: <TechnicianLogin /> },
  { path: "/technician/dashboard", element: <TechnicianDashboard /> },
  { path: "/student/apply-laptop", element: <Apply /> },
  { path: "/student/application-status", element: <ApplicationStatus /> },
  { path: "/technician/notifications", element: <TechNotification /> },
  { path: "/technician/registerNewDevice", element: <NewDeviceRegister /> },


  

  
]);
