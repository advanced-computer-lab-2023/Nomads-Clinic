import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY = 'pk_test_51MRMg1FxdCIg2t1cceq9TP6f6Bd5Bjiz14jCQwEhtweipUWgWYQaCy9aHXjm6ekVTB77a0s6UdC2GnD75UyLRLYM006FTvUYz6';
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({patientId, cart, totalPrice, selectedAddress, selectedPaymentMethod}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm  patientId={patientId} cart={cart} totalPrice={totalPrice} selectedAddress={selectedAddress} selectedPaymentMethod={selectedPaymentMethod}/>
    </Elements>
  );
};

export default StripeContainer;