import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const PatientChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { user } = useAuthContext();

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords have to match');
            setSuccessMessage('');
            return;
        }

        const response = await fetch(`/api/patients/changepassword/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ password: newPassword }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setSuccessMessage('Password changed successfully');
            setError('');
        } else {
            const json = await response.json();
            setError(json.error);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Change Password</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default PatientChangePassword;
