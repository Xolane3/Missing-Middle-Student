import React, { useState, useRef } from 'react';
import './contract.css';
import SignatureCanvas from 'react-signature-canvas';

const DeviceContractForm = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    studentId: '',
    email: '',
  });

  const [deviceInfo, setDeviceInfo] = useState({
    deviceModel: '',
    serialNumber: '',
  });

  const [agreement, setAgreement] = useState(false);
  const [signature, setSignature] = useState(null);
  const signaturePadRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in studentInfo) {
      setStudentInfo({ ...studentInfo, [name]: value });
    } else {
      setDeviceInfo({ ...deviceInfo, [name]: value });
    }
  };

  const handleAgreementChange = (e) => {
    setAgreement(e.target.checked);
  };

  const handleClearSignature = () => {
    signaturePadRef.current.clear();
    setSignature(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreement) {
      alert('You must agree to the terms and conditions before submitting.');
      return;
    }
    if (signaturePadRef.current.isEmpty()) {
      alert('Please provide a signature.');
      return;
    }

    const signatureData = signaturePadRef.current.toDataURL();
    setSignature(signatureData);

    const formData = { studentInfo, deviceInfo, signature: signatureData };
    console.log('Form submitted:', formData);
    alert('Contract submitted successfully!');
  };

  return (
    <div className="container mt-5">
      {/* 💼 Contract Header */}
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">📄 Device Contract</h1>
        <p className="lead text-muted">
          Please complete this contract to confirm the receipt and responsible use of the provided device.
        </p>
      </div>

      {/* 📝 Contract Form */}
      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        {/* Student Info */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Student Name:</label>
          <input type="text" className="form-control" id="name" name="name" value={studentInfo.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">Student ID:</label>
          <input type="text" className="form-control" id="studentId" name="studentId" value={studentInfo.studentId} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Student Email:</label>
          <input type="email" className="form-control" id="email" name="email" value={studentInfo.email} onChange={handleChange} required />
        </div>

        {/* Device Info */}
        <div className="mb-3">
          <label htmlFor="deviceModel" className="form-label">Device Model:</label>
          <input type="text" className="form-control" id="deviceModel" name="deviceModel" value={deviceInfo.deviceModel} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="serialNumber" className="form-label">Device Serial Number:</label>
          <input type="text" className="form-control" id="serialNumber" name="serialNumber" value={deviceInfo.serialNumber} onChange={handleChange} required />
        </div>

        {/* Terms */}
        <div className="mb-3">
          <h5 className="fw-semibold">Terms and Conditions</h5>
          <ul>
           <li>The device is intended strictly for academic use.</li>
           <li>The student accepts full responsibility for the care of the device.</li>
           <li>Loss or damage to the device is not covered by the university, and the student will bear full responsibility for any such incidents.</li>
           <li>The device becomes the student's property upon receipt, and must not be returned unless requested by the administration or upon the completion of studies.</li>
           <li>Return of the device upon request or completion of studies is mandatory.</li>
          </ul>
          <div className="form-check mt-2">
            <input type="checkbox" className="form-check-input" id="agreement" checked={agreement} onChange={handleAgreementChange} />
            <label className="form-check-label" htmlFor="agreement">
              I agree to the terms and conditions.
            </label>
          </div>
        </div>

        {/* Signature */}
        <div className="mb-3">
          <h5 className="fw-semibold">Signature</h5>
          <SignatureCanvas
            ref={signaturePadRef}
            penColor="black"
            backgroundColor="#fff"
            canvasProps={{
              width: 500,
              height: 200,
              className: 'signature-canvas border rounded',
            }}
          />
          <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleClearSignature}>
            Clear Signature
          </button>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary" disabled={!agreement}>
            Submit Contract
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceContractForm;
