import React, { useState } from 'react';


const PrescriptionDetails = ({ prescription}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="doctor-details" onClick={toggleExpand}>
         <h4>
                Prescriptiont Date: {prescription.day}/{prescription.month}/{prescription.year}
            </h4>
            {isExpanded && (
                <div>
                    <p><strong>Medicine Name: </strong>{prescription.medicineName}</p>
                    <p><strong>Status: </strong>{prescription.status}</p>
                </div>
            )}
        </div>
    );
};

export default PrescriptionDetails;
