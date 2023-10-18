import React, { useEffect, useState } from 'react';
import ApprovalDoctorDetails from '../../components/Admin/ApprovalDoctorDetails';
const AdminViewApprovalDoctors = () => {
    const [doctors, setDoctors] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctors/notapproved');
            const json = await response.json();

            if (response.ok) {
                setDoctors(json);
            }
        };
        fetchDoctors();
    }, []);

    const handleDeleteDoctor = async (doctorId) => {
        try {
            const response = await fetch(`/api/doctors/${doctorId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
    
                const updatedDoctors = doctors.filter((doctor) => doctor._id !== doctorId);
                setDoctors(updatedDoctors);
            } else {
     
                console.error('Error deleting doctor');
            }
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    }
    const handleApproveDoctor = async (doctorId) => {
        try {
            const response = await fetch(`/api/doctors/${doctorId}`, {
                method: 'PATCH', // Use PUT or another appropriate HTTP method for updating data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: true }), // Send the approved value as true
            });
    
            if (response.ok) {
                // Assuming you receive an updated doctor object as a response, you can update the local state
                const updatedDoctor = await response.json();
                const updatedDoctors = doctors.map((doctor) =>
                    doctor._id === updatedDoctor._id ? updatedDoctor : doctor
                );
                window.location.reload();
                setDoctors(updatedDoctors);
            } else {
                console.error('Error approving doctor');
            }
        } catch (error) {
            console.error('Error approving doctor:', error);
        }
    }
    return (
        <div className="home">
            <div className="doctors">
                {doctors && doctors.map((doctor) => (
                    <ApprovalDoctorDetails key={doctor._id} doctor={doctor} onDelete={handleDeleteDoctor} onApprove={handleApproveDoctor} />
                ))}
            </div>
        </div>
    );
};

export default AdminViewApprovalDoctors;

