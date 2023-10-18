import React, { useEffect, useState } from 'react';
import HealthPackageDetails from '../../components/Admin/HealthPackageDetails';
import HealthPackageEditForm from '../../components/Admin/HealthPackageEditForm';
import { Link } from 'react-router-dom'

const AdminViewHealthPackages = () => {
    const [healthPackages, setHealthPackages] = useState(null);
    const [clinicPricePrice, setClinicPricePrice] = useState('')
    const [newClinicPrice, setNewClinicPrice] = useState('')
    const [isEditing, setIsEditing] = useState(false);
    const [editingHealthPackageId, setEditingHealthPackageId] = useState(null); // Define editingHealthPackageId state


    useEffect(() => {
        const fetchHealthPackages = async () => {
            const response = await fetch('/api/healthpackages');
            const json = await response.json();

            if (response.ok) {
                setHealthPackages(json);
            }
        };

        const fetchClinicPrice = async () => {
            const response = await fetch('/api/clinicprice');
            const json = await response.json();

            if (response.ok && json.length > 0) {
                setClinicPricePrice(json[0].price)
                setNewClinicPrice(json[0].price) //new line here
            }
        };

        fetchHealthPackages();
        fetchClinicPrice()
    }, []);

    const handleDeleteHealthPackages = async (healthPackageId) => {
        try {
            const response = await fetch(`/api/healthpackages/${healthPackageId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
    
                const updatedHealthPackages = healthPackages.filter((healthPackage) => healthPackage._id !== healthPackage);
                window.location.reload();
                setHealthPackages(updatedHealthPackages);
            } else {
     
                console.error('Error deleting Health Package');
            }
        } catch (error) {
            console.error('Error deleting Health Package:', error);
        }
    };
    const handleUpdateClinicPrice = async () => {
        // Send an API request to update the clinic price with newClinicPrice
        try {
            const response = await fetch('/api/clinicprice', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price: newClinicPrice }),
            });

            if (response.ok) {
                setClinicPricePrice(newClinicPrice);
                setIsEditing(false);
            } else {
                console.error('Error updating clinic markup');
            }
        } catch (error) {
            console.error('Error updating clinic markup:', error);
        }
    };
    const handleEditHealthPackage = (healthPackageId) => {
        // Render the EditHealthPackage component when the "Edit" button is clicked
        setEditingHealthPackageId(healthPackageId);
    };


    return (
        <div className="home">
            <div className="healthPackages">
                {healthPackages && healthPackages.map((healthPackage) => (
                    <HealthPackageDetails key={healthPackage._id} healthPackage={healthPackage} onDelete={handleDeleteHealthPackages} onEdit={handleEditHealthPackage} />
                ))}
            </div>
            {editingHealthPackageId && (
                <HealthPackageEditForm healthPackageId={editingHealthPackageId} />
            )}
            <div className='add-new-admin-button'>
                <Link to="/healthPackage-form">
                    <button>Add a new Health Package</button>
                </Link>
                {isEditing ? (
                    <div>
                        <input
                            type="number"
                            value={newClinicPrice}
                            onChange={(e) => setNewClinicPrice(e.target.value)}
                        />
                        <div className='edit-button'>
                        <button onClick={handleUpdateClinicPrice}>Save</button>
                        </div>
                        <div className='edit-button'>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>Clinic Markup: {clinicPricePrice}</p>
                        <button onClick={() => setIsEditing(true)}>Update Clinic Markup</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminViewHealthPackages;









