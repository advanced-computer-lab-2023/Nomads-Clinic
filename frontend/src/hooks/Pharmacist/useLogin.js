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

        const pharmacistResponse = await fetch('/api/pharmacists/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const pharmacistJson = await pharmacistResponse.json()

        if (!pharmacistResponse.ok) {
            setIsLoading(false)
            setError(pharmacistJson.error)
        }
        if (pharmacistResponse.ok) {
            //save the user to local storage 
            localStorage.setItem('user', JSON.stringify(pharmacistJson))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: pharmacistJson })

            setIsLoading(false)
            navigate('/pharmacist-home')
        }
    }
    return { login, isLoading, error }
}