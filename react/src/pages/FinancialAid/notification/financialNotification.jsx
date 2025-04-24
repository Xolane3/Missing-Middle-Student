import React, { useEffect, useRef, useState } from "react";
import FinancialAidDashboard from "../../../components/financialAidNavBar";
import { motion } from "framer-motion";

const dummyNotifications = [
  {
    id: 1,
    student: "Nthabiseng Mokoena",
    studentNumber: "221123456",
    fundedStatus: "Funded",
    annualIncome: "R75,000",
    time: "2025-04-24 10:30",
  },
  {
    id: 2,
    student: "Thabo Dlamini",
    studentNumber: "221654321",
    fundedStatus: "Not Funded",
    annualIncome: "R180,000",
    time: "2025-04-24 11:00",
  },
  {
    id: 3,
    student: "Keabetswe Ndlovu",
    studentNumber: "221112233",
    fundedStatus: "Funded",
    annualIncome: "R60,000",
    time: "2025-04-24 12:45",
  },
];

const AdminNotificationChat = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [notifications]);

  return (
    <>
      <FinancialAidDashboard
        username="OneStop Admin"
        email="onestop@tut.ac.za"
        notifications={notifications.length}
      />
      <div className="container mt-4">
        <h4>NSFAS Funding Notifications</h4>
        <div
          ref={scrollRef}
          className="chat-box border rounded p-3 mt-3"
          style={{
            height: "400px",
            overflowY: "scroll",
            backgroundColor: "#f9f9f9",
          }}
        >
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 p-2 rounded shadow-sm"
              style={{
                backgroundColor: n.fundedStatus === "Funded" ? "#d1e7dd" : "#f8d7da",
              }}
            >
              <p className="mb-1">
                <strong>{n.student}</strong> ({n.studentNumber})
              </p>
              <p className="mb-1">
                Status: <strong>{n.fundedStatus}</strong> | Annual Income: <strong>{n.annualIncome}</strong>
              </p>
              <small className="text-muted">{n.time}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminNotificationChat;
