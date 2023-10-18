

import React, { useEffect, useState } from 'react';
import AppointmentDetails from '../../components/Doctor/AppointmentDetails';
import { useAuthContext } from '../../hooks/useAuthContext';

const DoctorViewAppointments = () => {
    const [appointments, setAppointments] = useState(null);
    const [filterConfirmed, setFilterConfirmed] = useState(false);
    const [filterCancelled, setFilterCancelled] = useState(false);
    const [filterByDate, setFilterByDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchAppointments = async () => {
            let apiUrl = '/api/appointments';

            if (filterConfirmed && !filterCancelled) {
                apiUrl = '/api/appointments/confirmed';
            } else if (!filterConfirmed && filterCancelled) {
                apiUrl = '/api/appointments/cancelled';
            } else if (filterByDate && selectedDate) {
                const dateObject = new Date(selectedDate);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1; // Add 1 because months are zero-based
                const day = dateObject.getDate();
                apiUrl = `/api/appointments/bydate?year=${year}&month=${month}&day=${day}`;
            }

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                setAppointments(json);
            }
        };

        if (user) {
            fetchAppointments();
        }
    }, [user, filterConfirmed, filterCancelled, filterByDate, selectedDate]);

    const clearDateFilter = () => {
        setFilterByDate(false);
        setSelectedDate('');
    };

    return (
        <div className="home">
           
            <div className="doctors">
                {appointments && appointments.map((appointment) => (
                    <AppointmentDetails
                        key={appointment._id}
                        appointment={appointment}
                    />
                ))}
            </div>
            <div className="search-options-app">
                <div className='date-date'>
                    <label>Date</label>
                    {filterByDate ? (
                        <div>
                            <input
                                type='date'
                                value={selectedDate}
                                min="2024-01-01"
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            <button onClick={clearDateFilter}>Clear Date Filter</button>
                        </div>
                    ) : (
                        <input
                            type='checkbox'
                            checked={filterByDate}
                            onChange={() => setFilterByDate(!filterByDate)}
                        />
                    )}
                </div>
                <div className='status-doc'>
                    Appointment Status:
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filterConfirmed}
                            onChange={() => setFilterConfirmed(!filterConfirmed)}
                        />
                        Confirmed
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filterCancelled}
                            onChange={() => setFilterCancelled(!filterCancelled)}
                        />
                        Cancelled
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DoctorViewAppointments
