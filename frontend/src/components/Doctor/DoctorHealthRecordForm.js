import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const DoctorHealthRecordForm = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Change from useHistory to useNavigate
  const { appointment } = location.state;
  const { patientId } = appointment;

  const upload = () => {
    setError(null);
    setEmptyFields([]);

    if (!user) {
      setError('You must be logged in');
      return;
    }

    if (!file) {
      setError('You must choose a file');
      setEmptyFields(['file']);
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    axios
      .post(`/api/healthRecords?patientId=${patientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // Close the form

       window.location.reload(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div>
      <h3>Add new Medical History Document</h3>

      <label>Document File: </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className={emptyFields.includes('file') ? 'error' : ''}
      />

      <button type="button" onClick={upload}>
        Add Document
      </button>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

export default DoctorHealthRecordForm;
