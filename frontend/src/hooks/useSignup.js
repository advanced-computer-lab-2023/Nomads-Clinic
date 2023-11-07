import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (signupAsA, username, firstName, lastName, email, password, dateOfBirth, gender, mobileNumber, emergencyContact, hourlyRate, affiliation, educationalBackground, specialty) => {
        setIsLoading(true)
        setError(null)

        switch (signupAsA) {
            case '':
            case '------------------Select an option-----------------------':
                setIsLoading(false)
                setError("Please Select Signup As A:");
                break;
            case 'Patient':

                if (gender === '' || gender === '------------------Select an option-----------------------') {
                    setIsLoading(false)
                    setError("Please Select a Gender");
                }
                else {
                    const response = await fetch('/api/patients/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, firstName, lastName, email, password, dateOfBirth, gender, mobileNumber, emergencyContact })
                    })
                    const json = await response.json()

                    if (!response.ok) {
                        setIsLoading(false)
                        setError(json.error)
                    }
                    if (response.ok) {
                        //save the user to local storage 
                        localStorage.setItem('user', JSON.stringify(json))

                        //update the auth context
                        dispatch({ type: 'LOGIN', payload: json })

                        setIsLoading(false)
                        navigate('/patient-home')
                    }
                }
                break;
            default:
                const response = await fetch('/api/doctors/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username,firstName,lastName,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground, specialty })
                })
                const json = await response.json()

                if (!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
                if (response.ok) {
                    //save the user to local storage 
                    localStorage.setItem('user', JSON.stringify(json))

                    //update the auth context
                    dispatch({ type: 'LOGIN', payload: json })

                    setIsLoading(false)
                    navigate('/not-approved-doctor')
                }

        }
    }
    return { signup, isLoading, error }
}