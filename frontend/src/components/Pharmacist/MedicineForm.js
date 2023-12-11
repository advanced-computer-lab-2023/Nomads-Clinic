import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const MedicineForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [use, setUse] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {

        if (!user) {
            setError('User not authenticated. Please log in.');
            return
        }

        e.preventDefault();
        const medicine = {name,use,description, ingredients, price, quantity, pharmacistId: user._id };

        // Reset error and emptyFields state
        setError(null);
        setEmptyFields([]);

        if (!name) {
            setEmptyFields([...emptyFields, 'name']);
        }
        if (!use) {
            setEmptyFields([...emptyFields, 'use']);
        }
        if (!description) {
            setEmptyFields([...emptyFields, 'description']);
        }
        if (!ingredients) {
            setEmptyFields([...emptyFields, 'ingredients']);
        }
        if (!price) {
            setEmptyFields([...emptyFields, 'price']);
        }
        if (!quantity) {
            setEmptyFields([...emptyFields, 'quantity']);
        }


        const response = await fetch('/api/medicine', {
            method: 'POST',
            body: JSON.stringify(medicine),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });

        if (!response.ok) {
            const json = await response.json();
            setError(json.error);
        } else {
            setName('')
            setUse('')
            setDescription('')
            setIngredients('')
            setPrice('')
            setQuantity('');
            console.log('New medicine added');
            navigate('/pharmacist-view-medicine');
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Medicine</h3>
            <label>Medicine Name: </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />
            <label>Medicine Use: </label>
            <input
                type="text"
                onChange={(e) => setUse(e.target.value)}
                value={use}
                className={emptyFields.includes('use') ? 'error' : ''}
            />
            <label>Description: </label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Ingredients (separated by commas or newlines): </label>
            <textarea
                rows="4"
                onChange={(e) => setIngredients(e.target.value)}
                value={ingredients}
                className={emptyFields.includes('ingredients') ? 'error' : ''}
            />
            <label> Price: </label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error' : ''}
            />
            <label>Quantity: </label>
            <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className={emptyFields.includes('quantity') ? 'error' : ''}
            />


            <button>Add Medicine</button>
            {error && <div className="error">{error}</div>}
            <div className='back-button'>
                <Link to="/pharmacist-view-medicine">
                    <button className='normal-button'>Back To all Medicine</button>
                </Link>
            </div>
        </form>
    )
}
export default MedicineForm