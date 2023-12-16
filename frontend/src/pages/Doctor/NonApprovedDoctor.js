import { useState, useEffect } from 'react'
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
  const [acceptedContract, setAcceptedContract] = useState(false);

  const doctorId = user?.id; // Define doctorId here

  useEffect(() => {
    if (user) {
      axios.get(`/api/doctors/${doctorId}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      }).then(res => {
        setAcceptedContract(res.data.accepted_contract);
      }).catch(err => {
        console.error(err);
      });
    }
  }, [doctorId, user?.token]);

  //const location = useLocation();
  //const { appointment } = location.state;

  const acceptContract = () => {
    const doctorId = user.id;
    axios.patch(`/api/doctors/${doctorId}`, { accepted_contract: true }, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }).then(res => {
      setAcceptedContract(true);
    }).catch(err => {
      setError(err.message);
    });
  };

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
      Your Request Has been submitted. Please upload required documents, accept the contract and await Admin approval.<br></br>
      </h3>
      (such as ID, Medical licenses and medical degree)
      </center>
      <div>
        <label>Document File: </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className={emptyFields.includes('file') ? 'error' : ''}
        />
        <button type='button' onClick={upload}>Add Document</button>
        {done && <center><h4>Document Uploaded Successfully!</h4></center>}
        {error && <div className="error">{error}</div>}
      </div>
      <br></br>
      <br></br>
      {!acceptedContract && <div>
        <label>Please Read and Accept our <a href="/Contract.pdf" target="_blank">Contract</a>: </label>
        <br></br>
        <button type='button' onClick={acceptContract}>Accept Contract</button>
      </div>}
      {acceptedContract && <center><h4>Contract Accepted!</h4></center>}
      <div className='back-button'>
        <Link to="/">
        <button className='normal-button'>Back To Home</button>
        </Link>
      </div>
    </div>
  )
}

export default NonApprovedDoctor;