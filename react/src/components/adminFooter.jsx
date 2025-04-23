import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { Modal } from 'bootstrap';

export default function AdminFooter() {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [bsModal, setBsModal] = useState(null);
  const [editable, setEditable] = useState(false);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/120");
  const [formData, setFormData] = useState({
    firstName: "Felecia",
    lastName: "Burke",
    email: "example@mail.com",
    day: "10",
    month: "June",
    year: "1990",
    gender: "Female",
  });

  useEffect(() => {
    if (modalRef.current) {
      const modal = new Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: false,
      });
      setBsModal(modal);
    }
  }, []);

  const openModal = () => {
    bsModal?.show();
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <footer className="mt-auto bg-light border-top py-3 w-100">
        <div className="container d-flex justify-content-between align-items-center position-relative">
          <div className="mx-auto">
            <p className="mb-0 fw-medium text-center">admin</p>
          </div>
          <div className="position-absolute end-0">
            <User className="text-secondary" role="button" onClick={openModal} />
          </div>
        </div>
      </footer>

      {/* Modal */}
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="accountModalLabel">Account Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex gap-4">
                <div className="text-center">
                  <img
                    src={profilePic}
                    alt="User"
                    className="rounded-circle mb-2"
                    width="120"
                    height="120"
                    style={{ objectFit: 'cover', cursor: 'pointer' }}
                    onClick={triggerFileInput}
                    title="Click to change photo"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    hidden
                  />
                  <small className="d-block text-muted">Click image to change</small>
                </div>

                <div className="flex-grow-1">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!editable}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!editable}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!editable}
                      />
                    </div>

                    <div className="mb-3 row">
                      <div className="col">
                        <label className="form-label">Date of Birth</label>
                        <div className="d-flex gap-2">
                          <select className="form-select" name="day" value={formData.day} onChange={handleChange} disabled={!editable}>
                            {[...Array(31)].map((_, i) => (
                              <option key={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                          <select className="form-select" name="month" value={formData.month} onChange={handleChange} disabled={!editable}>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                              <option key={month}>{month}</option>
                            ))}
                          </select>
                          <select className="form-select" name="year" value={formData.year} onChange={handleChange} disabled={!editable}>
                            {Array.from({ length: 50 }, (_, i) => (
                              <option key={1990 + i}>{1990 + i}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <label className="form-label">Gender</label>
                        <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} disabled={!editable}>
                          <option>Female</option>
                          <option>Male</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="button"
                        className={`btn ${editable ? "btn-primary" : "btn-outline-secondary"}`}
                        onClick={toggleEdit}
                      >
                        {editable ? "Update" : "Edit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
