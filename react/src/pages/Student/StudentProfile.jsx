import React, { useState } from "react";
import NavBar from "../../components/studentNavbar";

export default function StudentProfile() {
  const [user, setUser] = useState({
    username: "John Doe",
    email: "john.doe@example.com",
    studentNumber: "2023123456",
    course: "Advanced Diploma in IT",
    year: 1,
    nsfasFunded: false,
    profilePic: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <NavBar profilePic={user.profilePic} username={user.username} email={user.email} />
      <div className="container mt-4">
        <h2 className="fw-bold mb-3">Student Profile</h2>

        <div className="text-center mb-4">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="rounded-circle"
            style={{ width: 120, height: 120, objectFit: "cover" }}
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control mt-2"
            />
          </div>
        </div>

        <ul className="list-group">
          <li className="list-group-item"><strong>Name:</strong> {user.username}</li>
          <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
          <li className="list-group-item"><strong>Student Number:</strong> {user.studentNumber}</li>
          <li className="list-group-item"><strong>Course:</strong> {user.course}</li>
          <li className="list-group-item"><strong>Year:</strong> {user.year}</li>
          <li className="list-group-item"><strong>NSFAS Funded:</strong> {user.nsfasFunded ? "Yes" : "No"}</li>
        </ul>
      </div>
    </>
  );
}
