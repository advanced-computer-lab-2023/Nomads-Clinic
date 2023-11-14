import React, { useState, useEffect } from 'react';

const AppointmentDetails = ({ appointment,onHealthRecord,onPrescription,onFollowUP }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [patientInfo, setPatientInfo] = useState(null); // To store the patient's information
    const [isLoading, setIsLoading] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleHealthRecord= () => {
  
        onHealthRecord(appointment._id);
    };
    const handlePrescription= () => {
     
        onPrescription(appointment._id);
    };
    const handleFollowUp= () => {
    
        onFollowUP(appointment);
    };

    useEffect(() => {
        // Fetch patient details when the component is expanded
        if (isExpanded && !patientInfo) {
            setIsLoading(true);

            // Make an API request to fetch patient details
            fetch(`/api/patients/${appointment.patientId}`)
                .then((response) => response.json())
                .then((data) => {
                    setPatientInfo(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching patient details:', error);
                    setIsLoading(false);
                });
        }
    }, [isExpanded, appointment.patientId, patientInfo]);

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
                        <p>Loading Patient details...</p>
                    ) : (
                        <div>
                            {patientInfo ? (
                                <div>
                                    <p><strong>Patient Name:</strong> {patientInfo.firstName} {patientInfo.lastName}</p>
                                    <p><strong>Gender:</strong> {patientInfo.gender}</p>
                                    <p><strong>Date of Birth: </strong>{new Date(patientInfo.dateOfBirth).toLocaleDateString()}</p>
                                    <p><strong>Mobile Number:</strong> {patientInfo.mobileNumber}</p>
                                    <p><strong>Appointment Status:</strong> {appointment.status}</p>
                                    <div className='second' onClick={handleHealthRecord}>
                                        <div >View Patient Health Record</div>
                                    </div>
                                    <div className='second' onClick={handlePrescription} >
                                        <div >Add Prescription</div>
                                    </div>
                                    <div className='second'onClick={handleFollowUp} >
                                        <div >Schedule a follow-up</div>
                                    </div>
                                </div>
                            ) : (
                                <p>Failed to load patient details.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AppointmentDetails;
