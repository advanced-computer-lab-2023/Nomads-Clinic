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

        const doctorResponse = await fetch('/api/doctors/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const doctorJson = await doctorResponse.json()

        if (!doctorResponse.ok) {
            setIsLoading(false)
            setError(doctorJson.error)
        }
        if (doctorResponse.ok) {
            //save the user to local storage 
            localStorage.setItem('user', JSON.stringify(doctorJson))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: doctorJson })

            setIsLoading(false)
            navigate('/doctor-home')
        }
    }
    return { login, isLoading, error }
}