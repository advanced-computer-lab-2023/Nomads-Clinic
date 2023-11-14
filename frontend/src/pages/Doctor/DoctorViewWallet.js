import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const DoctorViewWallet = () => {
  const { user } = useAuthContext();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`/api/doctors/${user.id}`);
        const doctorData = await response.json();

        if (response.ok) {
          // Assuming 'wallet' is an attribute in the doctor schema
          setWallet(doctorData.wallet);
        } else {
          console.error('Failed to fetch doctor data');
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    if(user){

        fetchDoctorData();
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

export default DoctorViewWallet;






