import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const PatientViewWallet = () => {
  const { user } = useAuthContext();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`/api/patients/${user.id}`);
        const patientData = await response.json();

        if (response.ok) {
          // Assuming 'wallet' is an attribute in the patient schema
          setWallet(patientData.wallet);
        } else {
          console.error('Failed to fetch patient data');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    if(user){

        fetchPatientData();
    }

  }, [user]);

  return (
    <div className="home">
      {wallet !== null ? (
        <p>Wallet Funds: {wallet}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientViewWallet;






