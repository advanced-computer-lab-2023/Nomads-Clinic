import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const PatientSubscribedHealthPackage = () => {
  const { user } = useAuthContext();
  const [subscribedHealthPackage, setSubscribedHealthPackage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch the patient data using the patient's ID
        const response = await fetch(`/api/patients/${user.id}`);
        const patientData = await response.json();

        // Check if the patient is subscribed to a health package
        const { healthPackage } = patientData;

        if (healthPackage) {
          // If subscribed, fetch details of the subscribed health package
          const healthPackageResponse = await fetch(`/api/healthpackages/${healthPackage}`);
          const healthPackageData = await healthPackageResponse.json();
          setSubscribedHealthPackage(healthPackageData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [user.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="subscribedHealthPackage">
      {subscribedHealthPackage ? (
        <>
          <h2>My Health Package Details</h2>
          <p> Health Package Name: {subscribedHealthPackage.name}</p>
          <p>Price: {subscribedHealthPackage.price} L.E.</p>
          <p>Doctor Discount: {subscribedHealthPackage.doctorDiscount} %</p>
          <p>Medicine Discount: {subscribedHealthPackage.medicineDiscount} %</p>
          <p>Family Member Discount: {subscribedHealthPackage.medicineDiscount} %</p>
          
        </>
      ) : (
        <p>You are not subscribed to any health package.</p>
      )}
    </div>
  );
};

export default PatientSubscribedHealthPackage;
