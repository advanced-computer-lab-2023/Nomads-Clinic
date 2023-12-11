// CheckoutForm.js
// CheckoutForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({patientId, cart, totalPrice, selectedAddress, selectedPaymentMethod}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthContext();
  const history = useNavigate();

  const handleOrderPlacement = async () => {
    try {
      // Check if all required fields are available
      if (!patientId || !cart || !totalPrice || !selectedAddress || !selectedPaymentMethod) {
        console.error('Missing required fields for order placement.');
        return;
      }

      // Prepare the order data
      const orderData = {
        patientId,
        items: cart.map(item => ({
          medicine: item.medicine._id, // Assuming 'medicine' has an '_id' field
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
      };

      // Make the API call to create the order
      const response = await axios.post('/api/patients/createOrder', orderData, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      // Handle the response accordingly
      if (response.status === 201) {
        // Order created successfully, you can perform additional actions or show a success message
        console.log('Order created successfully:', response.data);
        history('/orders');
      } else {
        console.error('Error creating order:', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
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
    
    if (result.success) {
      handleOrderPlacement();
    }
    else{
      console.log("Payment",result);
    }

    // Handle the result (e.g., show success/failure message)
  } catch (error) {
    console.error('Error confirming payment intent:', error);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${0.60} with Stripe and order
      </button>
    </form>
  );
};

export default CheckoutForm;

  
  