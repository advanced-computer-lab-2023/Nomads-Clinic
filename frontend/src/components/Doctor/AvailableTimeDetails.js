import React, { useState } from 'react';


const AvailableTimeDetails = ({ availableTime, onBook}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const handleBookClick = () => {
        // Log the availableTime before calling onBook
        console.log('Available Time:', availableTime);

        // Call the onBook function passed as a prop
        onBook(availableTime);
    };
    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Date: {availableTime.year}/{availableTime.month}/{availableTime.day}</h4>
            {isExpanded && (
                <div>
                    <p><strong>Time: </strong>{availableTime.time} :00 pm</p>
                    <div className='second' onClick={handleBookClick}>
                        <div> Schedule Follow Up</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default AvailableTimeDetails;
