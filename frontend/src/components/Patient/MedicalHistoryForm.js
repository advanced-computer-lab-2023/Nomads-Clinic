import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const MedicalHistoryForm = () => {
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const navigate = useNavigate();

  const location = useLocation();
  const { appointment } = location.state;

  const { patientId } = appointment;

  const upload = () => {
    setError(null);
    setEmptyFields([]);

    if (!user) {
      setError('You must be logged in')
      return
    }
    console.log(user.id)

    if (!file) {
      setError('You must choose a file')
      setEmptyFields(['file']);
      return
    }
    
    const formData = new FormData()
    formData.append('document', file)
    axios.post(`/api/healthRecords?patientId=${patientId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => {
      navigate('/patient-view-medicalhistory');
      console.log(res)
    }).catch(err => {
      setError(err.message)
    })
  }

  return (
    <div>
      <h3>Add new Medical History Document</h3>

      <label>Document File: </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className={emptyFields.includes('file') ? 'error' : ''}
      />

      <button type='button' onClick={upload}>Add Document</button>
      {error && <div className="error">{error}</div>}
      <div className='back-button'>
        <Link to="/patient-view-healthRecords">
          <button className='normal-button'>Back To Medical History</button>
        </Link>
      </div>
    </div>
  )
}
export default MedicalHistoryForm