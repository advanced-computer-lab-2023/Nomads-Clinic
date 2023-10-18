import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const admin = { email, password };

    // Reset error and emptyFields state
    setError(null);
    setEmptyFields([]);

    if (!email) {
      setEmptyFields([...emptyFields, 'email']);
    }

    if (!password) {
      setEmptyFields([...emptyFields, 'password']);
    }

   
    const response = await fetch('/api/admins', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      setEmail('');
      setPassword('');
      console.log('New admin added');
      navigate('/admin-view-admins');
    }
  };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new admin</h3>
            <label>Email: </label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes('email') ? 'error' : ''}
            />

            <label>Password: </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={emptyFields.includes('password') ? 'error' : ''}
            />

          
            <button>Add Admin</button>
            {error && <div className="error">{error}</div>}
            <div className='back-button'>
            <Link to="/admin-view-admins">
                <button className='normal-button'>Back To all admins</button>
            </Link>
            </div>
        </form>
    )
}
export default AdminForm