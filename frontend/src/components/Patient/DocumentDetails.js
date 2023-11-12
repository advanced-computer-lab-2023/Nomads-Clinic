import React, { useState } from 'react';


const DocumentDetails = ({ document }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const filePath = '/uploads/' + document.document;
    return (
        <div className="doctor-details" onClick={toggleExpand}>
            {!isExpanded && (
                <div>
                    <embed
                    src={filePath}
                    width="1200px"
                    height="600px"
                    />
                </div>
            )}

            {isExpanded && (
                <div>
                    <embed
                    src={filePath}
                    width="100%"
                    height="100%"
                    />
                </div>
            )}
        </div>
    );
};

export default DocumentDetails