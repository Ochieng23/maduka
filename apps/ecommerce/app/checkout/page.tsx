// Import necessary dependencies
"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/payment'; // Update the path accordingly

// Load Stripe outside of the component so that it doesn't get reloaded on every render
const stripePromise = loadStripe('your_stripe_publishable_key');

// Wrap your component with the Elements provider
const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default CheckoutPage;
