import React, { useState } from 'react';


const MedicineDetails = ({ medicine }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
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
                </div>
            )}
        </div>
    );
};

export default MedicineDetails;
