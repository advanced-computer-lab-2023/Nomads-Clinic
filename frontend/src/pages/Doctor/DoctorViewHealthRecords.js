import React, { useEffect, useState } from 'react';
import DocumentDetails from '../../components/Doctor/DocumentDetails';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const DoctorViewHealthRecords = () => {
    const [HealthRecords, setHealthRecords] = useState(null);
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const location = useLocation();
    const { appointment } = location.state;
  
    const { patientId } = appointment;

  

    useEffect(() => {
        const fetchHealthRecords = async () => {
            const response = await fetch(`/api/healthrecords?patientId=${patientId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`

                }
            });
            const json = await response.json();

            if (response.ok) {
                setHealthRecords(json);
            }
        };
        if (user) {
            fetchHealthRecords();
        }

    }, [user,patientId]);

    const handleClick = (appointment) => {
        const { patientId } = appointment; // Extract only necessary properties
        navigate('/HealthRecords-form', { state: { appointment :{patientId} } });
      };

    return (
        <div className="home">
            <div className="doctors">
                {HealthRecords && HealthRecords.map((document) => (
                    <DocumentDetails
                        key={document._id} document={document} />
                ))}
                <div className='add-new-admin-button'>
                    <button onClick={handleClick}>Add a medical history document</button>
                </div>
            </div>
        </div>
    );
};


export default DoctorViewHealthRecords