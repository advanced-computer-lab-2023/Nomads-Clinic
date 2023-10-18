import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'


const Signup = () => {
  
    
    const [username, setUsername] = useState('')
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [emergencyFirstName, setEmergencyFirstName] = useState('');
    const [emergencyLastName, setEmergencyLastName] = useState('');
    const [emergencyMobileNumber, setEmergencyMobileNumber] = useState('');


    //for patients
    const [gender, setGender] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')



    //For doctors
    const [hourlyRate, setHourlyRate] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [educationalBackground, setEducationalBackground] = useState('')
    const [specialty, setSpecialty] = useState('');

    const [signupAsA, setSignupAsA] = useState('')
    const { signup, error, isLoading } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const emergencyContact = {
            firstName: emergencyFirstName,
            lastName: emergencyLastName,
            mobileNumber: emergencyMobileNumber
        };
        
     await signup(signupAsA,username,firstName,lastName,email,password,dateOfBirth,gender,mobileNumber,emergencyContact,hourlyRate,affiliation,educationalBackground,specialty)

    }
    const getLabelText = () => {
        if (signupAsA === 'Admin') {
            return 'Sign up as an';
        } else {
            return 'Signup as a:';
        }
    };
    const renderInput = () => {
        if (signupAsA === 'Patient') {
            return (
                <div>
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
                </div>
            );
        }
        if (signupAsA === 'Doctor') {
            return (
                <div>
                    <label>Hourly rate:</label>
                    <input
                        type="number"
                        onChange={(e) => setHourlyRate(e.target.value)}
                        value={hourlyRate}
                    />
                    <label>Affiliation (Hospital):</label>
                    <input
                        type="text"
                        onChange={(e) => setAffiliation(e.target.value)}
                        value={affiliation}
                    />
                    <label>Educational Backround:</label>
                    <input
                        type="text"
                        onChange={(e) => setEducationalBackground(e.target.value)}
                        value={educationalBackground}
                    />
                    <label>Specialty:</label>
                    <input
                        type="text"
                        onChange={(e) => setSpecialty(e.target.value)}
                        value={specialty}
                    />

                </div>
            );
        }
        return null;
    };


    return (
        <div>
        <form className="signup" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>{getLabelText()}</label>
            <div className='select'>
                <select
                    onChange={(e) => setSignupAsA(e.target.value)}
                    value={signupAsA}>
                    <option>------------------Select an option-----------------------</option>
                    <option >Patient</option>
                    <option >Doctor</option>
                </select>
            </div>
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
            {renderInput()}

            <button className='signup-login-button' disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
            
        </form>
        
           </div>
    )

}
export default Signup