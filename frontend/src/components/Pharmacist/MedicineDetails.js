import React, { useState } from 'react';


const MedicineDetails = ({ medicine,onEdit }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleEditClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onEdit(medicine._id);
    };


    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4>Medicine name: {medicine.name}</h4>
            {isExpanded && (
                <div>
                    <p><strong>Use: </strong>{medicine.use}</p>
                    <p><strong>Description: </strong>{medicine.description}</p>
                    <p><strong>Price: </strong>{medicine.price}</p>
                    <p><strong>Ingredients: </strong> {medicine.ingredients}</p>
                    <p><strong>Quantity: </strong>{medicine.quantity}</p>
                    <p><strong>Total Sales: </strong>{medicine.sales}</p>
                    <div className='second' onClick={handleEditClick}>
                        <div className="material-icons-outlined">edit</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicineDetails;
