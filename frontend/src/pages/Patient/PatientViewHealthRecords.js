import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import DocumentDetails from '../../components/Patient/DocumentDetails';
import {useAuthContext} from '../../hooks/useAuthContext'

const PatientViewMedicalHistory = () => {
    const [MedicalHistory, setMedicalHistory] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            const response = await fetch('/api/healthrecords', {
                headers: {
                    'Authorization': `Bearer ${user.token}`

                }
            });
            const json = await response.json();

            if (response.ok) {
                setMedicalHistory(json);
            }
        };
        if(user){
            fetchMedicalHistory();
        }
      
    }, [user]);

    return (
        <div className="home">
            <div className="doctors">
                {MedicalHistory && MedicalHistory.map((document) => (
                    <DocumentDetails
                        key={document._id} document={document} />
                ))}
                <div className='add-new-admin-button'>
                    <Link to="/HealthRecords-form">
                        <button>Add a medical history document</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default PatientViewMedicalHistory