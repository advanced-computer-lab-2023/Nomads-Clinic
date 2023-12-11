import React, { useEffect, useState } from 'react';
import PharmacistDetails from '../../components/Admin/PharmacistDetails';

const AdminViewPharmacists = () => {
    const [pharmacists, setPharmacists] = useState(null);

    useEffect(() => {
        const fetchPharmacists = async () => {
            const response = await fetch('/api/pharmacists/approved');
            const json = await response.json();

            if (response.ok) {
                setPharmacists(json);
            }
        };
        fetchPharmacists();
    }, []);

    const handleDeletePharmacist = async (pharmacistId) => {
        try {
            const response = await fetch(`/api/pharmacists/${pharmacistId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
    
                const updatedPharmacists = pharmacists.filter((pharmacist) => pharmacist._id !== pharmacistId);
                window.location.reload();
                setPharmacists(updatedPharmacists);
            } else {
     
                console.error('Error deleting pharmacist');
            }
        } catch (error) {
            console.error('Error deleting pharmacist:', error);
        }
    };

    return (
        <div className="home">
            <div className="pharmacists">
            {pharmacists && pharmacists.map((pharmacist) => (
    <PharmacistDetails
        key={pharmacist._id} pharmacist={pharmacist} onDelete={handleDeletePharmacist}/>
))}
            </div>
        </div>
    );
};

export default AdminViewPharmacists;

