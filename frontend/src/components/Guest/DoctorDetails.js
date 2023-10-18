import React, { useState } from 'react';


const DoctorDetails = ({ doctor, onDelete }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Doctor Name:{doctor.firstName} {doctor.lastName}</h4>
            <p><strong>Speciality: </strong>{doctor.speciality}</p>
            <p><strong>Session Price (Per hour): </strong>{doctor.hourlyRate}</p>

            {isExpanded && (
                <div>
                    <p><strong>Affiliation (Hospital): </strong>{doctor.affiliation}</p>
                    <p><strong>Educational Backround: </strong>{doctor.educationalBackground}</p>
                    <p><strong>Date of Birth: </strong>{new Date(doctor.dateOfBirth).toLocaleDateString()}</p>

                </div>
            )}
        </div>
    );
};

export default DoctorDetails;
