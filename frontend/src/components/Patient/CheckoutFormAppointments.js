// CheckoutForm.js
// CheckoutForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


const CheckoutFormAppointments = ({aTime,onBook,patientId,  totalPrice,  selectedPaymentMethod}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthContext();
  const history = useNavigate();

 
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet
    return;
  }

  // Create a payment method
  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement(CardElement),
  });

  if (error) {
    console.error(error);
    return;
  }

  // Confirm the payment intent on your server
  try {
    const response = await fetch('/api/patients/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: paymentMethod.id,
        amount: 60, // Convert to cents (if using USD)
        currency: 'usd', // Change to your currency
      }),
    });

    const result = await response.json();
    
   
      console.log("Payment",result);
    
      onBook(aTime)
      history('/patient-view-appointments')
    // Handle the result (e.g., show success/failure message)
  } catch (error) {
    console.error('Error confirming payment intent:', error);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${totalPrice} with Stripe 
      </button>
    </form>
  );
};

export default CheckoutFormAppointments;

  
  