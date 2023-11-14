import React, { useState } from 'react';


const DoctorDetails = ({ doctor, onBook}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const handleBookClick = () => {
     
        onBook(doctor._id);
    };

    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Doctor Name: {doctor.firstName} {doctor.lastName}</h4>
            <p><strong>Specialty: </strong>{doctor.specialty}</p>
            <p><strong>Session Price: </strong>{doctor.hourlyRate}<strong> Per hour </strong></p>

            {isExpanded && (
                <div>
                    <p><strong>Affiliation (Hospital): </strong>{doctor.affiliation}</p>
                    <p><strong>Educational Backround: </strong>{doctor.educationalBackground}</p>
                    <p><strong>Date of Birth: </strong>{new Date(doctor.dateOfBirth).toLocaleDateString()}</p>
                    <div className='second' onClick={handleBookClick}>
                        <div> Book appointment</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default DoctorDetails;
