import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';



const MedicineEditForm = ({ medicineId }) => {
    const [medicine, setMedicine] = useState({});
    const {user} = useAuthContext()
    const [formData, setFormData] = useState({
        name: '',
        use: '',
        description: '',
        ingredients: '',
        price: 0
    });

    useEffect(() => {
        // Fetch the medicine details based on medicineId
        const fetchMedicine = async () => {
            try {
                const response = await fetch(`/api/medicine/${medicineId}`,{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMedicine(data);
                    setFormData({
                        name: data.name,
                        use: data.use,
                        description: data.description,
                        ingredients: data.ingredients,
                        price: data.price,
                    });
                } else {
                    console.error('Error fetching medicine details');
                }
            } catch (error) {
                console.error('Error fetching medicine details:', error);
            }
        };

        fetchMedicine();
    }, [user,medicineId]);

    if (!medicine) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        const { name,use,description,ingredients,price, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [use]: value,
            [description]: value,
            [ingredients]: value,
            [price]: value
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/medicine/${medicineId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Redirect to the health packages page after successful update
                // You can use a router or window.location for this purpose
                window.location.href = '/pharmacist-view-medicine'; // Replace with your desired URL
            } else {
                console.error('Error updating medcicine');
            }
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    };

    return (
        <div className="edit-health-package">
            <h2>Edit Medicine</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Use:</label>
                <input type="text" name="use" value={formData.use} onChange={handleInputChange} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div>
                <label>Ingredients:</label>
                <input type="text" name="ingredients" value={formData.ingredients} onChange={handleInputChange} />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </div>
            <div>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default MedicineEditForm
