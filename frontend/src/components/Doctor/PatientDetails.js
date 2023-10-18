import React, { useState, useEffect } from 'react';

const PatientDetails = ({ appointment, patientData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [patientInfo, setPatientInfo] = useState(null); // To store the patient's information
    const [isLoading, setIsLoading] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        // Fetch patient details when the component is expanded
        if (!patientInfo) {
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

            {patientInfo && (

                <div>
                    {isExpanded ? (
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
                                            <div className='second' >
                                                <div >View Health Records</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Failed to load patient details.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {isLoading ? (
                                <p>Loading Patient details...</p>
                            ) : (
                                <div>
                                    {patientInfo ? (
                                        <div>
                                            <h4>
                                                Patient Username: {patientInfo.username}
                                            </h4>

                                        </div>
                                    ) : (
                                        <h4>Failed to load patient details</h4>
                                    )}
                                </div>
                            )}
                        </div>)}
                </div>)}
        </div>
    );
};

export default PatientDetails
