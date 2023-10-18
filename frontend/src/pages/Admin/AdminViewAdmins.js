import React, { useEffect, useState } from 'react';
import AdminDetails from '../../components/Admin/AdminDetails';
import {Link} from 'react-router-dom'

const AdminViewAdmins = () => {
    const [admins, setAdmins] = useState(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            const response = await fetch('/api/admins');
            const json = await response.json();

            if (response.ok) {
                setAdmins(json);
            }
        };
        fetchAdmins();
    }, []);

    const handleDeleteAdmin = async (adminId) => {
        try {
            const response = await fetch(`/api/admins/${adminId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
    
                const updatedAdmins = admins.filter((admin) => admin._id !== adminId);
                setAdmins(updatedAdmins);
            } else {
     
                console.error('Error deleting admin');
            }
        } catch (error) {
            console.error('Error deleting Admin:', error);
        }
    };

    return (
        <div className="home">
            <div className="admins">
                {admins && admins.map((admin) => (
                    <AdminDetails key={admin._id} admin={admin} onDelete={handleDeleteAdmin} />
                ))}
            </div>
            <div className='add-new-admin-button'>
            <Link to="/admin-form">
                <button>Add a new Admin</button>
            </Link>
            </div>
        </div>
    );
};

export default AdminViewAdmins;

