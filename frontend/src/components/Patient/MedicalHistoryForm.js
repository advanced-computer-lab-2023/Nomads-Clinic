import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios'

const MedicalHistoryForm = () => {
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

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
    axios.post('/api/healthRecords', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      setError(err)
    })

    console.log(user.token)
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
      {error && <div className="error">{error.message}</div>}
      <div className='back-button'>
        <Link to="/patient-view-medicalhistory">
          <button className='normal-button'>Back To Medical History</button>
        </Link>
      </div>
    </div>
  )
}
export default MedicalHistoryForm