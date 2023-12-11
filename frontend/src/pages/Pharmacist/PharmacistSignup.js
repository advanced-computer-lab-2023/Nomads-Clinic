import { useState } from 'react'
import { useSignup } from '../../hooks/Pharmacist/useSignup'


const PharmacistSignup = () => {


    const [username, setUsername] = useState('')
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')



    //For doctors // pharmacists
    const [hourlyRate, setHourlyRate] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [educationalBackground, setEducationalBackground] = useState('')
    const [specialty, setSpecialty] = useState('');
    const { signup, error, isLoading } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, firstName, lastName, email, password, dateOfBirth,hourlyRate,affiliation,educationalBackground,specialty)

    }

    return (
        <div>
            <form className="signup" onSubmit={handleSubmit}>
                <h2> Pharmacist Sign up</h2>
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

                <button className='signup-login-button' disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}

            </form>

        </div>
    )

}
export default PharmacistSignup