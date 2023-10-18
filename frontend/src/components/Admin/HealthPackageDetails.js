import React, { useState } from 'react';

const HealthPackageDetails = ({ healthPackage, onDelete, onEdit }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const handleClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onDelete(healthPackage._id);
    };
    const handleEditClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onEdit(healthPackage._id);
    };

    return (
        <div className="admin-details" onClick={toggleExpand}>
            <h4> Health Package Tier: {healthPackage.name}</h4>


            {isExpanded && (
                <div>
                    <span className="material-icons-outlined" onClick={handleClick}>delete</span>
                    <p><strong>Price: </strong>{healthPackage.price}<strong> Per Year  </strong></p>
                    <p><strong>Doctor Session discount: </strong>{healthPackage.doctorDiscount}<strong>%</strong></p>
                    <p><strong>Medicine discount: </strong>{healthPackage.medicineDiscount}<strong>%</strong></p>
                    <p><strong>Family Member discount: </strong>{healthPackage.familyMemberDiscount}<strong>%</strong></p>
                    <div className='second' onClick={handleEditClick}>
                        <div className="material-icons-outlined">edit</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default HealthPackageDetails;
