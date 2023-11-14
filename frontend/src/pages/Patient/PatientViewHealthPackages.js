import React, { useEffect, useState } from 'react';
import HealthPackageDetails from '../../components/Patient/HealthPackageDetails';
import { useAuthContext } from '../../hooks/useAuthContext';

const PatientViewHealthPackages = () => {
  const { user } = useAuthContext();
  const [healthPackages, setHealthPackages] = useState(null);
  const [selectedHealthPackage, setSelectedHealthPackage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [error,setError]=useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const fetchHealthPackages = async () => {
    try {
      const response = await fetch('/api/healthpackages');
      const json = await response.json();

      if (response.ok) {
        setHealthPackages(json);
      }
    } catch (error) {
      console.error('Error fetching health packages:', error);
    }
  };

  useEffect(() => {
    fetchHealthPackages();
  }, []);

  const handleSubscribe = async () => {
    try {
      // Fetch the current user data from the server
      const userResponse = await fetch(`/api/patients/${user.id}`);
      const userData = await userResponse.json();
  
      // Check if the patient is already subscribed to any health package
      const { healthPackage: currentHealthPackage } = userData;
  
      if (currentHealthPackage) {
        // Display an error message
        console.error('You are already subscribed to a health package');
        return;
      }
  
      // Fetch the selected health package data
      const { _id: healthPackageId, price } = selectedHealthPackage;
  
      // Check the user's wallet balance
      const { wallet } = userData;
  
      if (selectedPaymentMethod === 'wallet' && wallet >= price) {
        // Deduct the cost from the user's wallet
        const updatedWallet = wallet - price;
  
        // Update the user's wallet and healthPackage on the server
        await fetch(`/api/patients/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wallet: updatedWallet,
            healthPackage: healthPackageId,
          }),
        });
  
        // Close the payment modal
        setIsPaymentModalOpen(false);
      } else if (selectedPaymentMethod === 'creditCard') {
        // Handle credit card payment logic here
        // You might want to open a payment modal or redirect to a payment page
        console.log('Processing credit card payment');
      } else {
        // Handle insufficient wallet balance or invalid payment method
        console.error('Insufficient wallet balance or invalid payment method');
      }
    } catch (error) {
      console.error('Error subscribing to health package:', error);
    }
  };
  

  const openPaymentModal = async (healthPackage) => {
    const userResponse = await fetch(`/api/patients/${user.id}`);
    const userData = await userResponse.json();

    // Check if the patient is already subscribed to any health package
    const { healthPackage: currentHealthPackage } = userData;

    if (currentHealthPackage) {
      // Display an error message
      setError('You are already subscribed to a health package');
      return;
    }
    setSelectedHealthPackage(healthPackage);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setSelectedHealthPackage(null);
    setSelectedPaymentMethod(null);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="home">
      <div className="healthPackages">
        {healthPackages &&
          healthPackages.map((healthPackage) => (
            <div key={healthPackage._id} className="healthPackageContainer">
              <HealthPackageDetails healthPackage={healthPackage} onSubscribe={()=>openPaymentModal(healthPackage)}/>
            </div>
          ))}
  {error && <p>{error}</p>}
      </div>

      {isPaymentModalOpen && (
        <div className="paymentModal">
          <h3>Select Payment Method</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={selectedPaymentMethod === 'wallet'}
              onChange={() => setSelectedPaymentMethod('wallet')}
            />
            Wallet
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={selectedPaymentMethod === 'creditCard'}
              onChange={() => setSelectedPaymentMethod('creditCard')}
            />
            Credit Card
          </label>
          <button onClick={handleSubscribe}>Confirm Payment</button>
          <button onClick={closePaymentModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PatientViewHealthPackages;
