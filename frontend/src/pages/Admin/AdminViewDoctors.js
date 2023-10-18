import React, { useEffect, useState } from 'react';
import DoctorDetails from '../../components/Admin/DoctorDetails';

const AdminViewDoctors = () => {
    const [doctors, setDoctors] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctors/approved');
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
                window.location.reload();
                setDoctors(updatedDoctors);
            } else {
     
                console.error('Error deleting doctor');
            }
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <div className="home">
            <div className="doctors">
            {doctors && doctors.map((doctor) => (
    <DoctorDetails
        key={doctor._id} doctor={doctor} onDelete={handleDeleteDoctor}/>
))}
            </div>
        </div>
    );
};

export default AdminViewDoctors;

