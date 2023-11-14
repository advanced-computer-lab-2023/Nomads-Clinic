import React, { useEffect, useState } from 'react';
import PrescriptionDetails from '../../components/Doctor/PrescriptionDetails';
import {useAuthContext} from '../../hooks/useAuthContext'
import {useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const DoctorViewPrescriptions = () => {
    const navigate = useNavigate();

    const [prescriptions, setPrescriptions] = useState(null);
    const {user} = useAuthContext()

    const location = useLocation();

    const { appointment } = location.state;
    const { year, month, day, patientId } = appointment;

    useEffect(() => {
        const fetchPrescriptions = async () => {
            const response = await fetch(`/api/prescriptions?patientId=${patientId}`, {
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
      
    }, [user,patientId]);
    const viewPrescriptions = () => {
        navigate('/prescription-form', {
          state: {
            appointment: { year, month, day, patientId }
          }
        });
      };
    
    return (
        <div className="home">
            <div className="doctors">
                {prescriptions && prescriptions.map((prescription) => (
                    <PrescriptionDetails
                        key={prescription._id} prescription={prescription} />
                ))}
                <div className='add-new-admin-button'>
                        <button onClick={viewPrescriptions}> Add a Prescription</button>
                </div>
            </div>
        </div>
    );
};


export default DoctorViewPrescriptions