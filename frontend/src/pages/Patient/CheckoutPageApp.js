import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import StripeContainerAppointments from '../../components/Patient/StripeContainerAppointments';
import { useNavigate } from 'react-router-dom';

const CheckoutPageApp = ({  aTime,onBook, doctor }) => {
  const history = useNavigate();
  const { user } = useAuthContext();
  const patientId = user ? user.id : null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleSubscribe = async () => {
    try {
      // Fetch the current user data from the server
      const userResponse = await fetch(`/api/patients/${user.id}`);
      const userData = await userResponse.json();

      // Check the user's wallet balance
      const { wallet } = userData;

      if (selectedPaymentMethod === 'wallet' && wallet >= doctor.hourlyRate) {
        // Deduct the cost from the user's wallet
        const updatedWallet = wallet - doctor.hourlyRate;

        // Update the user's wallet and healthPackage on the server
        await fetch(`/api/patients/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wallet: updatedWallet,
          }),
        });
        onBook(aTime);
        history('/patient-view-appointments')


        // Close the payment modal
      } else {
        setErrorMessage("Insufficient funds in the wallet");
      }
    } catch (error) {
      console.error('Error subscribing to health package:', error);
    }
  };

  return (
    <div>
      <div className="payment-method-section">
        <h3>Select Payment Method:</h3>
        <div>
          <label>
            <input
              type="radio"
              value="wallet"
              checked={selectedPaymentMethod === 'wallet'}
              onChange={handlePaymentMethodChange}
            />
            Wallet
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="creditCard"
              checked={selectedPaymentMethod === 'creditCard'}
              onChange={handlePaymentMethodChange}
            />
            Credit Card (Stripe)
          </label>
        </div>
      </div>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {selectedPaymentMethod === 'creditCard' && (
        <StripeContainerAppointments  aTime={aTime} onBook={onBook} patientId={patientId} totalPrice={doctor.hourlyRate} selectedPaymentMethod={selectedPaymentMethod} />
      )}

      {selectedPaymentMethod === 'wallet' && (
        <button onClick={handleSubscribe}>Pay with Wallet</button>
      )}
    </div>
  );
};

export default CheckoutPageApp;
