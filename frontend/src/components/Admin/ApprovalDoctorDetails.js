import React, { useState } from 'react';

const ApprovalDoctorDetails = ({ doctor, onDelete, onApprove }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onDelete(doctor._id);
    };
    const handleApproveClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onApprove(doctor._id);
    };

    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Doctor Username:{doctor.username}</h4>
            <p><strong>Specialty: </strong>{doctor.specialty}</p>
            <p><strong>Session Price (Per hour): </strong>{doctor.hourlyRate}</p>

            {isExpanded && (
                <div>
                    <span className="material-icons-outlined" onClick={handleClick}>delete</span>
                   
                    <p><strong>Doctor Name: </strong>{doctor.firstName} {doctor.lastName}</p>
                    <p><strong>Email: </strong>{doctor.email}</p>
                    <p><strong>Affiliation (Hospital): </strong>{doctor.affiliation}</p>
                    <p><strong>Educational Backround: </strong>{doctor.educationalBackground}</p>
                    <p><strong>Date of Birth: </strong>{new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
                    <div className='second' onClick={handleApproveClick}>
                        <div className="material-icons-outlined">check</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ApprovalDoctorDetails;
















