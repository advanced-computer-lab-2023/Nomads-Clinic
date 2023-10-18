import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const FamilyMemberForm = () => {
  const navigate = useNavigate();
  const { user} = useAuthContext()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [relationToThePatient, setRelationToThePatient] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!user) {
      setError('You must be logged in')
      return
    }
    const familyMember = { firstName, lastName, nationalId, age, gender, relationToThePatient };

    // Reset error and emptyFields state
    setError(null);
    setEmptyFields([]);

    if (!firstName) {
      setEmptyFields([...emptyFields, 'firstName']);
    }
    if (!lastName) {
      setEmptyFields([...emptyFields, 'lastName']);
    }
    if (!nationalId) {
      setEmptyFields([...emptyFields, 'nationalId']);
    }
    if (!age) {
      setEmptyFields([...emptyFields, 'age']);
    }
    if (!gender) {
      setEmptyFields([...emptyFields, 'gender']);
    }
    if (!relationToThePatient) {
      setEmptyFields([...emptyFields, 'relationToThePatient']);
    }
    if(gender==='' || gender==='------------------Select an option-----------------------'){
      setError('Please select a gender')
      return
    }
    if(relationToThePatient==='' || relationToThePatient==='------------------Select an option-----------------------'){
      setError('Please select Relation')
      return
    }

    const response = await fetch('/api/familymembers', {
      method: 'POST',
      body: JSON.stringify(familyMember),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`

      },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setFirstName('');
      setLastName('');
      setNationalId('');
      setAge('');
      setGender('');
      setRelationToThePatient('');
      console.log('New family member added');
      navigate('/patient-view-familymembers');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new Family Member</h3>

      <label>First Name </label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={emptyFields.includes('firstName') ? 'error' : ''}
      />
      <label>Last Name </label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={emptyFields.includes('lastName') ? 'error' : ''}
      />

      <label>National ID: </label>
      <input
        type="number"
        onChange={(e) => setNationalId(e.target.value)}
        value={nationalId}
        className={emptyFields.includes('nationalId') ? 'error' : ''}
      />
      <label>Age: </label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes('age') ? 'error' : ''}
      />
      <label>Gender: </label>
      <select
        onChange={(e) => setGender(e.target.value)}
        value={gender}>
        <option>------------------Select an option-----------------------</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <label>Relation:  </label>
      <select
        onChange={(e) => setRelationToThePatient(e.target.value)}
        value={relationToThePatient}>
        <option>------------------Select an option-----------------------</option>
        <option>Husband</option>
        <option>Wife</option>
        <option>Child</option>
      </select>


      <button>Add Family Member</button>
      {error && <div className="error">{error}</div>}
      <div className='back-button'>
        <Link to="/patient-view-familymembers">
          <button className='normal-button'>Back To all Family Members</button>
        </Link>
      </div>
    </form>
  )
}
export default FamilyMemberForm