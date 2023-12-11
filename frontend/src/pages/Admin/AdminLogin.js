import { useState } from 'react'
import {useLogin} from '../../hooks/Admin/useLogin'


const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2> Admin log in</h2>
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

            <button className='signup-login-button' disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )

}
export default AdminLogin
