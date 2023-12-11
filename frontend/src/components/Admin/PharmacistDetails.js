import React, { useState } from 'react';


const DoctorDetails = ({ pharmacist, onDelete }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onDelete(pharmacist._id);
    };

    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Doctor Username: {pharmacist.username}</h4>
            <p><strong>Specialty: </strong>{pharmacist.specialty}</p>
            <p><strong>Session Price (Per hour): </strong>{pharmacist.hourlyRate}</p>

            {isExpanded && (
                <div>
                    <span className="material-icons-outlined" onClick={handleClick}>delete</span>
                    <p><strong>Doctor Name: </strong>{pharmacist.firstName} {pharmacist.lastName}</p>
                    <p><strong>Email: </strong>{pharmacist.email}</p>
                    <p><strong>Affiliation (Hospital): </strong>{pharmacist.affiliation}</p>
                    <p><strong>Educational Backround: </strong>{pharmacist.educationalBackground}</p>
                    <p><strong>Date of Birth: </strong>{new Date(pharmacist.dateOfBirth).toLocaleDateString()}</p>

                </div>
            )}
        </div>
    );
};

export default DoctorDetails;
