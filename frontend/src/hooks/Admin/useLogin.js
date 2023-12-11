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

        const adminResponse = await fetch('/api/admins/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const adminJson = await adminResponse.json()

        if (!adminResponse.ok) {
            setIsLoading(false)
            setError(adminJson.error)
        }
        if (adminResponse.ok) {
            //save the user to local storage 
            localStorage.setItem('user', JSON.stringify(adminJson))

            //update the auth context
            dispatch({ type: 'LOGIN', payload: adminJson })

            setIsLoading(false)
            navigate('/admin-home')
        }
    }
    return { login, isLoading, error }
}