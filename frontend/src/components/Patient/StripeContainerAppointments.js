import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutFormAppointments from './CheckoutFormAppointments';

const PUBLIC_KEY = 'pk_test_51MRMg1FxdCIg2t1cceq9TP6f6Bd5Bjiz14jCQwEhtweipUWgWYQaCy9aHXjm6ekVTB77a0s6UdC2GnD75UyLRLYM006FTvUYz6';
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainerAppointments = ({ aTime,onBook,patientId,  totalPrice,  selectedPaymentMethod}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormAppointments  aTime={aTime}onBook={onBook}  patientId={patientId} totalPrice={totalPrice}  selectedPaymentMethod={selectedPaymentMethod}/>
    </Elements>
  );
};

export default StripeContainerAppointments;