import React from 'react';
import DoctorHealthRecordForm from './DoctorHealthRecordForm';

const DoctorHealthRecordModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <DoctorHealthRecordForm />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DoctorHealthRecordModal;
