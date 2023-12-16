import React, { useState } from 'react';


const MedicineDetails = ({ medicine }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    //const [hasImage, setHasImage] = useState(false);
    let hasImage = false;
    let filePath = ''; 
    
    
    if(medicine.image) {
        //setHasImage(true);
        hasImage = true;
        filePath = '/uploads/medicine/' + medicine.image;
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    
    return (
        <div className="doctor-details" onClick={toggleExpand}>
            {hasImage && <img src={filePath} alt="Medicine Image" width='60' height='60'></img>}
            <h4>Medicine name: {medicine.name}</h4>
            {isExpanded && (
                <div>
                    <p><strong>Use: </strong>{medicine.use}</p>
                    <p><strong>Description: </strong>{medicine.description}</p>
                    <p><strong>Price: </strong>{medicine.price}</p>
                    <p><strong>Ingredients: </strong> {medicine.ingredients}</p>
                    <p><strong>Quantity: </strong>{medicine.quantity}</p>
                </div>
            )}
        </div>
    );
};

export default MedicineDetails;
