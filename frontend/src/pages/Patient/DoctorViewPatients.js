import React, { useEffect, useState } from 'react';
import PatientDetails from '../../components/Doctor/PatientDetails';
import { useAuthContext } from '../../hooks/useAuthContext';

const DoctorViewPatients = () => {
    const [appointments, setAppointments] = useState([]);
    const [uniquePatients, setUniquePatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/api/appointments', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }

                const appointmentData = await response.json();

                // Fetch patient details for each appointment and update the state
                const appointmentsWithPatientData = await Promise.all(
                    appointmentData.map(async (appointment) => {
                        const patientData = await fetchPatientDetails(appointment.patientId, user.token);
                        return { ...appointment, patient: patientData };
                    })
                );

                setAppointments(appointmentsWithPatientData);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        if (user) {
            fetchAppointments();
        }
    }, [user]);
    const fetchPatientDetails = async (patientId) => {
        try {
            const response = await fetch(`/api/patients/${patientId}`);
    
            if (!response.ok) {
                // Check if the error is due to patient not found
                if (response.status === 404) {
                    console.warn(`Patient not found for ID: ${patientId}`);
                    return null; // Return null for non-existent patients
                } else {
                    throw new Error(`Failed to fetch patient details for patientId: ${patientId}`);
                }
            }
    
            const patientData = await response.json();
            return patientData;
        } catch (error) {
            console.error('Error fetching patient details:', error);
            return null; // Return null in case of any error
        }
    };
    
    useEffect(() => {
        // Create a Set to store unique patient IDs
        const uniquePatientIds = new Set();
        // Filter out duplicate patients and update uniquePatients state
        const uniquePatientsList = appointments.filter((appointment) => {
            if (!uniquePatientIds.has(appointment.patient._id)) {
                uniquePatientIds.add(appointment.patient._id);
                return true;
            }
            return false;
        });
        setUniquePatients(uniquePatientsList);
    }, [appointments]);
    const filteredPatients = uniquePatients.filter((patient) => {
        // Check if patient and patient.patient are not null and undefined
        if (patient && patient.patient) {
            const patientId = patient.patient._id;
    
            // Check if patientId is not null and undefined
            if (patientId) {
                const patientFirstName = patient.patient.firstName.toLowerCase();
                const patientLastName = patient.patient.lastName.toLowerCase();
                const query = searchQuery.toLowerCase();
    
                // Check if either first name or last name includes the query
                return patientFirstName.includes(query) || patientLastName.includes(query);
            }
        }
    
        return false; // If patient, patient.patient, or patient.patient._id is null or undefined, filter it out
    });
    
    
    
    return (
        <div className="home2">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search patients by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="patients">
                {filteredPatients.map((patient) => (
                    <PatientDetails key={patient.patient._id} appointment={patient} />
                ))}
            </div>
        </div>
    );
};

export default DoctorViewPatients;
