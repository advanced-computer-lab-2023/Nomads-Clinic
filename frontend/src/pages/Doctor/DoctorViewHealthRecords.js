import React, { useEffect, useState } from 'react';
import DocumentDetails from '../../components/Doctor/DocumentDetails';
import DoctorHealthRecordModal from '../../components/Doctor/DoctorHealthRecordModal'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const DoctorViewHealthRecords = () => {
  const [HealthRecords, setHealthRecords] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation();
  const { appointment } = location.state;

  const { patientId } = appointment;

  useEffect(() => {
    const fetchHealthRecords = async () => {
      const response = await fetch(`/api/healthrecords?patientId=${patientId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setHealthRecords(json);
      }
    };

    if (user) {
      fetchHealthRecords();
    }

  }, [user, patientId]);

  const handleClick = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="home">
      <div className="doctors">
        {HealthRecords && HealthRecords.map((document) => (
          <DocumentDetails key={document._id} document={document} />
        ))}
        <div className='add-new-admin-button'>
          <button onClick={handleClick}>Add a medical history document</button>
        </div>
      </div>

      {isModalOpen && (
        <DoctorHealthRecordModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default DoctorViewHealthRecords;
