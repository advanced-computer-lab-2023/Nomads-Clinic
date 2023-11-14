import React, { useEffect, useState } from 'react';
import {useLocation,Link} from 'react-router-dom'
import AvailableTimeDetails from '../../components/Patient/AvailableTimeDetails';
import {useAuthContext} from '../../hooks/useAuthContext'

const PatientBookAppointment= () => {
    const [availableTimes, setAvailableTimes] = useState(null);
    const location = useLocation();
    const doctor = location.state?.doctor;
    const [error, setError] = useState('');
    const {user} = useAuthContext()

    const handleBook = async (selectedAvailableTime) => {
        try {
            // Update the available time to mark it as booked
            const updatedAvailableTime = { ...selectedAvailableTime, booked: true };
            await fetch(`/api/availableTimes/${selectedAvailableTime._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAvailableTime),
            });
    
            const newAppointment = {
                year: selectedAvailableTime.year,
                month: selectedAvailableTime.month,
                day: selectedAvailableTime.day,
                time: selectedAvailableTime.time,
                doctorId: selectedAvailableTime.doctorId,
                status: 'Upcoming',
                patientId: user.id,
            };
    
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAppointment),
            });
    
            if (response.ok) {
                // Handle success, e.g., show a success message
                console.log('Appointment booked successfully');
                window.location.reload();
            } else {
                const json = await response.json();
                setError(json.error);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            setError('An error occurred while booking the appointment');
        }
    };
    

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            const response = await fetch(`/api/availableTimes/NotBooked?doctorId=${doctor._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`

                }
            });
            const json = await response.json();

            if (response.ok) {
                setAvailableTimes(json);
            }
        };
        if(user){
            fetchAvailableTimes();
        }
      
    }, [user,doctor._id]);

    return (
        <div className="home">
            <div className="doctors">
                {availableTimes && availableTimes.map((availableTime) => (
                    <AvailableTimeDetails
                        key={availableTime._id} availableTime={availableTime} onBook={handleBook} />
                ))}
                {error && error.message}
            </div>
        </div>
    );
};


export default PatientBookAppointment