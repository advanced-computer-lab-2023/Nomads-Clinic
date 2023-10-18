import React, {useState} from 'react';

const PatientDetails = ({ patient, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onDelete(patient._id);
    };

    return (
        <div className="patient-details" onClick={toggleExpand}>
            <h4> Patient Username: {patient.username}</h4>
            {isExpanded && (
                <div>
                    <span className="material-icons-outlined" onClick={handleClick}>delete</span>
                    <p><strong> Patient Name:</strong> {patient.firstName} {patient.lastName}</p>
                    <p><strong>Email: </strong>{patient.email}</p>
                    <p><strong>Date of Birth: </strong>{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Gender:  </strong>{patient.gender}</p>
                    <p><strong>Mobile Number:  </strong>{patient.mobileNumber}</p>
        
                </div>
            )}


        </div>
    );
};

export default PatientDetails;
