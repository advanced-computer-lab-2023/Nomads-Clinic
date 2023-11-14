import React, { useState, useEffect, useCallback } from 'react';
import {  Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const DoctorAddAvailableTime = () => {
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
            const response = await fetch(`/api/availableTimes/ByDate?year=${year}&month=${month}&day=${day}&time=${time}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.length > 0) {
                setError('This was already added ');
            } else {
                setError('');
            }
        } catch (error) {
            console.error('Error fetching availableTimes:', error);
            setError('Error fetching availableTimes');
        }
    }, [user]);

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



    const handleaddAppointment = async () => {
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
    
            // Create a new availableTime object
            const newAvailableTime = {
                year,
                month,
                day,
                time: selectedTime
            };
    
         
            const response = await fetch('/api/availableTimes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAvailableTime),
            });
    
            if (response.status === 200) {
                setError('Available time added successfully.');


            } else {
                setError('Failed to add the availableTime. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding availableTime:', error);
            setError('Error adding availableTime. Please try again later.');
        }
    };
    

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    
        // Check if selectedDate is set before making the fetch request
        if (selectedDate) {
            const dateObject = new Date(selectedDate);
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1;
            const day = dateObject.getDate();
            checkSessionAvailability(year, month, day, e.target.value);
        }
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    // Format the date as "YYYY-MM-DD"
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    

    return (
        <div>
            <h2> Add Available Time </h2>
            <div>
                <p>Select a Date:</p>
                <input
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    value={selectedDate}
                    min={tomorrowFormatted} 
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
            <div className='add'>
                {!error && selectedDate && selectedTime &&selectedTime !=='------------------Select a time-----------------------' && <button onClick={handleaddAppointment}> Add Available Time</button>}
            </div>
            <div className='back'>
                <Link to='/doctor-home'>
                <button> Back to Home</button>
                </Link>
            </div>
            
        </div>
    );
};

export default DoctorAddAvailableTime
