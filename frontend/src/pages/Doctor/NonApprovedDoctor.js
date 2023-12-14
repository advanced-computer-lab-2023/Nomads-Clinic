import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
//import { useLocation } from 'react-router-dom';
import axios from 'axios'

const NonApprovedDoctor = () => {

  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [done, setDone] = useState(null)
  const [file, setFile] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  //const location = useLocation();
  //const { appointment } = location.state;

  //const { doctorId } = appointment;

  const upload = () => {
    setError(null);
    setDone(false);
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
    axios.post(`/api/doctors/document`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      setDone(false)
      setError(err.message)
      return
    })
    setDone(true)
  }

    return(
        <div>
            <center><h3>
            Your Request Has been submitted. Please upload required documents and await Admin approval.<br></br>
            </h3>
            (such as ID, Medical licenses and medical degree)
            </center>
            <label>Document File: </label>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className={emptyFields.includes('file') ? 'error' : ''}
            />
            <button type='button' onClick={upload}>Add Document</button>
            {done && <center><h4>Document Uploaded Successfully!</h4></center>}
            {error && <div className="error">{error}</div>}
            <div className='back-button'>
                <Link to="/">
                <button className='normal-button'>Back To Home</button>
                </Link>
            </div>
        </div>
    )
}

export default NonApprovedDoctor;