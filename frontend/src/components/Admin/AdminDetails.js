import React from 'react';

const AdminDetails = ({ admin, onDelete }) => {
    const handleClick = () => {
        // Call the onDelete function passed as a prop with the workout ID
        onDelete(admin._id);
    };

    return (
        <div className="admin-details">
            <h4> Admin Email: {admin.email}</h4>
            <p><strong>Admin password: </strong>{admin.password}</p>
            <span className="material-icons-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default AdminDetails;
