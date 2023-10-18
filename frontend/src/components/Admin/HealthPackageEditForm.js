import React, { useState, useEffect } from 'react';

const HealthPackageEditForm = ({ healthPackageId }) => {
    const [healthPackage, setHealthPackage] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        doctorDiscount: 0,
        medicineDiscount: 0,
        familyMemberDiscount: 0,
    });

    useEffect(() => {
        // Fetch the health package details based on healthPackageId
        const fetchHealthPackage = async () => {
            try {
                const response = await fetch(`/api/healthpackages/${healthPackageId}`);
                if (response.ok) {
                    const data = await response.json();
                    setHealthPackage(data);
                    setFormData({
                        name: data.name,
                        price: data.price,
                        doctorDiscount: data.doctorDiscount,
                        medicineDiscount: data.medicineDiscount,
                        familyMemberDiscount: data.familyMemberDiscount,
                    });
                } else {
                    console.error('Error fetching health package details');
                }
            } catch (error) {
                console.error('Error fetching health package details:', error);
            }
        };

        fetchHealthPackage();
    }, [healthPackageId]);

    if (!healthPackage) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        const { name,price,doctorDiscount,medicineDiscount,familyMemberDiscount, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [price]: value,
            [doctorDiscount]: value,
            [medicineDiscount]: value,
            [familyMemberDiscount]: value
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/healthpackages/${healthPackageId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Redirect to the health packages page after successful update
                // You can use a router or window.location for this purpose
                window.location.href = '/admin-view-healthpackages'; // Replace with your desired URL
            } else {
                console.error('Error updating health package');
            }
        } catch (error) {
            console.error('Error updating health package:', error);
        }
    };

    return (
        <div className="edit-health-package">
            <h2>Edit Health Package</h2>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </div>
            <div>
                <label>Doctor Discount:</label>
                <input type="number" name="doctorDiscount" value={formData.doctorDiscount} onChange={handleInputChange} />
            </div>
            <div>
                <label>Medicine Discount:</label>
                <input type="number" name="medicineDiscount" value={formData.medicineDiscount} onChange={handleInputChange} />
            </div>
            <div>
                <label>Family Member Discount:</label>
                <input type="number" name="familyMemberDiscount" value={formData.familyMemberDiscount} onChange={handleInputChange} />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default HealthPackageEditForm
