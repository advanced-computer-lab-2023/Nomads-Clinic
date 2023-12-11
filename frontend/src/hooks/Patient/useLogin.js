import { useState } from 'react'
import { useAuthContext } from '../useAuthContext'
import { useNavigate } from 'react-router-dom'


export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const patientResponse = await fetch('/api/patients/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const patientJson = await patientResponse.json()

        if (!patientResponse.ok) {
            setIsLoading(false)
            setError(patientJson.error)
        }
        if (patientResponse.ok) {
            //save the user to local storage 
            localStorage.setItem('user', JSON.stringify(patientJson))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: patientJson })

            setIsLoading(false)
            navigate('/patient-home')
        }
    }
    return { login, isLoading, error }
}