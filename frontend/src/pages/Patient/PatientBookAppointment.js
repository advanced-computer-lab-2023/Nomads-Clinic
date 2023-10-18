import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const PatientBookAppointment = () => {
    const location = useLocation();
    const doctor = location.state?.doctor;
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [error, setError] = useState('');

    
    const { user } = useAuthContext();

    // Define checkSessionAvailability function using useCallback
    const checkSessionAvailability = useCallback(async (year, month, day, time) => {
        if (!user) {
            setError('User not authenticated. Please log in.');
            return;
        }

        try {
            const response = await fetch(`/api/appointments/available?year=${year}&month=${month}&day=${day}&time=${time}&doctorId=${doctor._id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.length > 0) {
                setError('This session is already reserved');
            } else {
                setError('');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Error fetching appointments');
        }
    }, [doctor._id, user]);

    useEffect(() => {
        // Check session availability when date or time changes
        if (selectedDate && selectedTime) {
            const dateObject = new Date(selectedDate);
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1;
            const day = dateObject.getDate();
            checkSessionAvailability(year, month, day, selectedTime);
        }
    }, [selectedDate, selectedTime, checkSessionAvailability,user]);



    const handleBookAppointment = async () => {
        try {
            if (!selectedDate || !selectedTime) {
                setError('Please select both a date and a time.');
                return;
            }

            if (!user) {
                setError('User not authenticated. Please log in.');
                return;
            }
    
    
            // Get year, month, and day from selectedDate
            const dateObject = new Date(selectedDate);
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1; // Add 1 because months are zero-based
            const day = dateObject.getDate();
    
            // Create a new appointment object
            const newAppointment = {
                year,
                month,
                day,
                time: selectedTime,
                doctorId: doctor._id,
                status: 'Confirmed',
                patientId: user._id, 
            };
    
         
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAppointment),
            });
    
            if (response.status === 200) {
                setError('Appointment booked successfully.');


            } else {
                setError('Failed to book the appointment. Please try again later.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            setError('Error booking appointment. Please try again later.');
        }
    };
    

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
        const dateObject = new Date(selectedDate);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        checkSessionAvailability(year, month, day, e.target.value);
    };

    return (
        <div>
            <h2>Book an Appointment with Dr. {doctor.firstName} {doctor.lastName}</h2>
            <h3>Doctor Specialty: {doctor.specialty}</h3>
            <div>
                <p>Select a Date:</p>
                <input
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    value={selectedDate}
                    min="2024-01-01" // Set the minimum date to January 1, 2024
                />
            </div>
            <div>
                Select session Time:
            </div>
            <div>
                <select
                    onChange={handleTimeChange}
                    value={selectedTime}
                >
                    <option>------------------Select a time-----------------------</option>
                    <option>12</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                p.m.
            </div>
            {error && <div className="error">{error}</div>}
            <div className='book'>
                {!error && selectedDate && selectedTime &&selectedTime !=='------------------Select a time-----------------------' && <button onClick={handleBookAppointment}> Book an Appointment</button>}
            </div>
            <div className='back'>
                <Link to='/patient-view-doctors'>
                <button> Back to All Doctors</button>
                </Link>
            </div>
            
        </div>
    );
};

export default PatientBookAppointment;
