import React, { useState } from 'react';

const ApprovalPharmacistDetails = ({ pharmacist, onDelete, onApprove }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onDelete(pharmacist._id);
    };
    const handleApproveClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onApprove(pharmacist._id);
    };

    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Pharmacist Username:{pharmacist.username}</h4>
            <p><strong>Specialty: </strong>{pharmacist.specialty}</p>
            <p><strong>Session Price (Per hour): </strong>{pharmacist.hourlyRate}</p>

            {isExpanded && (
                <div>
                    <span className="material-icons-outlined" onClick={handleClick}>delete</span>
                   
                    <p><strong>Pharmacist Name: </strong>{pharmacist.firstName} {pharmacist.lastName}</p>
                    <p><strong>Email: </strong>{pharmacist.email}</p>
                    <p><strong>Affiliation (Hospital): </strong>{pharmacist.affiliation}</p>
                    <p><strong>Educational Backround: </strong>{pharmacist.educationalBackground}</p>
                    <p><strong>Date of Birth: </strong>{new Date(pharmacist.dateOfBirth).toLocaleDateString()}</p>
                    <div className='second' onClick={handleApproveClick}>
                        <div className="material-icons-outlined">check</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ApprovalPharmacistDetails;
















