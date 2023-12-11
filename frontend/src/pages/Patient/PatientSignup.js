import { useState } from 'react'
import { useSignup } from '../../hooks/Patient/useSignup'


const PatientSignup = () => {
  
    
    const [username, setUsername] = useState('')
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')


    //for patients
    const [gender, setGender] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [emergencyFirstName, setEmergencyFirstName] = useState('');
    const [emergencyLastName, setEmergencyLastName] = useState('');
    const [emergencyMobileNumber, setEmergencyMobileNumber] = useState('');


    const { signup, error, isLoading } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const emergencyContact = {
            firstName: emergencyFirstName,
            lastName: emergencyLastName,
            mobileNumber: emergencyMobileNumber
        };
        
     await signup(username,firstName,lastName,email,password,dateOfBirth,gender,mobileNumber,emergencyContact)

    }

    return (
        <div>
        <form className="signup" onSubmit={handleSubmit}>
            <h2> Patient Sign up</h2>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>First Name:</label>
            <input
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstName}
            />
            <label>Last Name:</label>
            <input
                type="text"
                onChange={(e) => setLastname(e.target.value)}
                value={lastName}
            />
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Date of Birth:</label>
            <input
                type="date"
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
            />
           <label>Gender:</label>
                    <div className='select'>
                        <select
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}>
                            <option>------------------Select an option-----------------------</option>
                            <option >Male</option>
                            <option >Female</option>
                        </select>
                    </div>
                    <label>Mobile Number:</label>
                    <input
                        type="number"
                        onChange={(e) => setMobileNumber(e.target.value)}
                        value={mobileNumber}
                    />
                    <label>Emergency Contact- First Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setEmergencyFirstName(e.target.value)}
                        value={emergencyFirstName}
                    />
                    <label>Emergency Contact- Last Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setEmergencyLastName(e.target.value)}
                        value={emergencyLastName}
                    />
                    <label>Emergency Contact- Mobile Number:</label>
                    <input
                        type="number"
                        onChange={(e) => setEmergencyMobileNumber(e.target.value)}
                        value={emergencyMobileNumber}
                    />

            <button className='signup-login-button' disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
            
        </form>
        
           </div>
    )

}
export default PatientSignup