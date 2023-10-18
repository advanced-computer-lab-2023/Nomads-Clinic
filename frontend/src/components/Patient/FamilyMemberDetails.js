import React, { useState } from 'react';


const FamilyMemberDetails = ({ familyMember }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="doctor-details" onClick={toggleExpand}>
            <h4> Name: {familyMember.firstName} {familyMember.lastName}</h4>

            {isExpanded && (
                <div>
                    <p><strong>National ID: </strong>{familyMember.nationalId}</p>
                    <p><strong>Age: </strong>{familyMember.age}</p>
                    <p><strong>Gender: </strong>{familyMember.gender}</p>
                    <p><strong>Relation: </strong>{familyMember.relationToThePatient}</p>
                </div>
            )}
        </div>
    );
};

export default FamilyMemberDetails
