import React, { useEffect, useState } from 'react';
import PatientDetails from '../../components/Admin/PatientDetails';

const AdminViewPatients = () => {
    const [patients, setPatients] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch('/api/patients');
            const json = await response.json();

            if (response.ok) {
                setPatients(json);
            }
        };
        fetchPatients();
    }, []);

    const handleDeletePatient = async (patientId) => {
        try {
            const response = await fetch(`/api/patients/${patientId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
    
                const updatedPatients = patients.filter((patient) => patient._id !== patientId);
                setPatients(updatedPatients);
            } else {
     
                console.error('Error deleting patient');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    return (
        <div className="home">
            <div className="patients">
                {patients && patients.map((patient) => (
                    <PatientDetails key={patient._id} patient={patient} onDelete={handleDeletePatient} />
                ))}
            </div>
        </div>
    );
};

export default AdminViewPatients;

