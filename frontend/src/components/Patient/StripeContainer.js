import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY = 'pk_live_51MRMg1FxdCIg2t1c6mNomIm7mXjUhXXQ8YjKV21UtXmUiNGY6dSawbibSiY20lDiAr7j7ijQEwehwLDiNCxj8SwQ00hIOmYImL';
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({patientId, cart, totalPrice, selectedAddress, selectedPaymentMethod}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm  patientId={patientId} cart={cart} totalPrice={totalPrice} selectedAddress={selectedAddress} selectedPaymentMethod={selectedPaymentMethod}/>
    </Elements>
  );
};

export default StripeContainer;