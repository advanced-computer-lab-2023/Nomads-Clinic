import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'


export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (loginAsA, email, password) => {
        setIsLoading(true)
        setError(null)

        switch (loginAsA) {
            case '':
            case '------------------Select an option-----------------------':
                setIsLoading(false)
                setError("Please Select Signup As A:");
                break;
            case 'Patient':



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

                break;
            case 'Doctor':
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
                break;
            default:
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
                break;

        }
    }
    return { login, isLoading, error }
}