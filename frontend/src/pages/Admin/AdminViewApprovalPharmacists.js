import React, { useEffect, useState } from 'react';
import ApprovalPharmacistDetails from '../../components/Admin/ApprovalPharmacistDetails';
const AdminViewApprovalPharmacists = () => {
    const [pharmacists, setPharmacists] = useState(null);

    useEffect(() => {
        const fetchPharmacists = async () => {
            const response = await fetch('/api/pharmacists/notapproved');
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
                setPharmacists(updatedPharmacists);
            } else {
     
                console.error('Error deleting pharmacist');
            }
        } catch (error) {
            console.error('Error deleting pharmacist:', error);
        }
    }
    const handleApprovePharmacist = async (pharmacistId) => {
        try {
            const response = await fetch(`/api/pharmacists/${pharmacistId}`, {
                method: 'PATCH', // Use PUT or another appropriate HTTP method for updating data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: true }), // Send the approved value as true
            });
    
            if (response.ok) {
                // Assuming you receive an updated pharmacist object as a response, you can update the local state
                const updatedPharmacist = await response.json();
                const updatedPharmacists = pharmacists.map((pharmacist) =>
                    pharmacist._id === updatedPharmacist._id ? updatedPharmacist : pharmacist
                );
                window.location.reload();
                setPharmacists(updatedPharmacists);
            } else {
                console.error('Error approving pharmacist');
            }
        } catch (error) {
            console.error('Error approving pharmacist:', error);
        }
    }
    return (
        <div className="home">
            <div className="pharmacists">
                {pharmacists && pharmacists.map((pharmacist) => (
                    <ApprovalPharmacistDetails key={pharmacist._id} pharmacist={pharmacist} onDelete={handleDeletePharmacist} onApprove={handleApprovePharmacist} />
                ))}
            </div>
        </div>
    );
};

export default AdminViewApprovalPharmacists;

