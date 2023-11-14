import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginAsA, setLoginAsA] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(loginAsA,email, password)
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <label>Log in as a:</label>
            <div className='select'>
                <select
                    onChange={(e) => setLoginAsA(e.target.value)}
                    value={loginAsA}>
                    <option>------------------Select an option-----------------------</option>
                    <option >Patient</option>
                    <option >Doctor</option>
                    <option >Admin</option>
                </select>
            </div>
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
                 <Link to="/forgot-password">Forgot Password?</Link>
        </form>
    )

}
export default Login
