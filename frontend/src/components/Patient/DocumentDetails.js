import React, { useState } from 'react';
import {useAuthContext} from '../../hooks/useAuthContext'


const DocumentDetails = ({ document }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const {user} = useAuthContext()

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDelete = () => {
        fetch('/api/healthrecords/' + document._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        }).then((response) => {
            if (response.ok) {
                window.location.reload();
            }
        });
    }

    const filePath = '/uploads/healthRecords/' + document.document;
    return (
        <div className="doctor-details" ><center>
            {!isExpanded && (
                <div>
                    <embed
                    src={filePath}
                    width="300px"
                    height="600px"
                    onClick={toggleExpand}
                    />
                </div>
            )}

            {isExpanded && (
                <div>
                    <embed
                    src={filePath}
                    width="100%"
                    height="100%"
                    onClick={toggleExpand}
                    />
                </div>
            )}
            </center>
            <span onClick={handleDelete}>delete</span>
        </div>
    );
};

export default DocumentDetails