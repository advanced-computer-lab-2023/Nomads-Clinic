import React, { useState, useEffect } from 'react';

const PrescriptionDetails = ({ prescription }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [doctorInfo, setDoctorInfo] = useState(null); // To store the doctor's information
    const [isLoading, setIsLoading] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        // Fetch doctor details when the component is expanded
        if (isExpanded && !doctorInfo) {
            setIsLoading(true);

            // Make an API request to fetch doctor details
            fetch(`/api/doctors/${appointment.doctorId}`)
                .then((response) => response.json())
                .then((data) => {
                    setDoctorInfo(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching doctor details:', error);
                    setIsLoading(false);
                });
        }
    }, [isExpanded, appointment.doctorId, doctorInfo]);

    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4>
                Appointment Date: {appointment.day}/{appointment.month}/{appointment.year}
            </h4>
            <h4>   
                Appointment Time: {appointment.time}:00 pm
            </h4>

            {isExpanded && (
                <div>
                    {isLoading ? (
                        <p>Loading doctor details...</p>
                    ) : (
                        <div>
                            {doctorInfo ? (
                                <div>
                                    <p>Doctor Name: {doctorInfo.firstName} {doctorInfo.lastName}</p>
                                    <p>Specialty: {doctorInfo.specialty}</p>
                                    <p>Session Price: {doctorInfo.hourlyRate} LE</p>
                                    <p>Appointment Status: {appointment.status}</p>
                                </div>
                            ) : (
                                <p>Failed to load doctor details.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AppointmentDetails;
