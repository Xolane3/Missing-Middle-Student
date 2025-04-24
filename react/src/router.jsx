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
import Applications  from "./pages/Admin/applications/applications";
import Students from "./pages/Admin/students/students";
import AdminNotifications from "./pages/Admin/notifications/notifications";
import TechViewDevices from "./pages/Technician/viewDevices/viewAllDevices";
import OneStopDashboard from "./pages/OneStop/oneStopDashboard";
import RegisterStudent from "./pages/OneStop/registerStudents/registerStudents";
import OneStopNotification from "./pages/OneStop/notifications/oneStopNotification";




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
  { path: "/admin/applications", element: <Applications /> },
  { path: "/admin/students", element: <Students /> },
  { path: "/student/notifications", element: <Notifications /> },
  { path: "/admin/notifications", element: <AdminNotifications /> },
  { path: "/technician/viewDevices", element: <TechViewDevices /> },
  { path: "/onestop/dashboard", element: <OneStopDashboard /> },
  { path: "/onestop/register-student", element: <RegisterStudent /> },
  {path: "/onestop/notifications", element: <OneStopNotification />},


  

  
]);
