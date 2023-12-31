import React, { useEffect, useState } from 'react';
import PrescriptionDetails from '../../components/Patient/PrescriptionDetails';
import {useAuthContext} from '../../hooks/useAuthContext'

const PatientViewPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchPrescriptions = async () => {
            const response = await fetch('/api/prescriptions', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                setPrescriptions(json);
            }
        };
        if(user){
            fetchPrescriptions();
        }
      
    }, [user]);

    return (
        <div className="home">
            <div className="doctors">
                {prescriptions && prescriptions.map((prescription) => (
                    <PrescriptionDetails
                        key={prescription._id} prescription={prescription} />
                ))}
            </div>
        </div>
    );
};


export default PatientViewPrescriptions