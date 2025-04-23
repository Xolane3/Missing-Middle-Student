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
        </div>
      </footer>


    </>
  );
}
