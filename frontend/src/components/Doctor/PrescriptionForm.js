import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';

const PrescriptionForm = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [medicineName, setMedicineName] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const location = useLocation();
  const { appointment } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { year, month, day, patientId } = appointment;

    const prescription = {
      year,
      month,
      day,
      medicineName,
      status: 'Unfilled',
      patientId,
      doctorId: user.id,
    };

    // Reset error and emptyFields state
    setError(null);
    setEmptyFields([]);

    if (!medicineName) {
      setEmptyFields([...emptyFields, 'medicineName']);
      return; // Stop the function if there are empty fields
    }

    const response = await fetch('/api/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescription),
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setMedicineName('');
      console.log('New prescription added');
      viewPrescriptions(appointment);
    }
  };

  const viewPrescriptions = (appointment) => {
    navigate('/doctor-view-prescriptions', { state: { appointment } });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new Prescription</h3>
      <label>Medicine Name: </label>
      <input
        type="text"
        onChange={(e) => setMedicineName(e.target.value)}
        value={medicineName}
        className={emptyFields.includes('medicineName') ? 'error' : ''}
      />
      <button>Add Prescription</button>
      {error && <div className="error">{error}</div>}

      <div className='back-button'>
        <button className='normal-button' onClick={() => viewPrescriptions(appointment)}>
          Back To all Prescriptions
        </button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
