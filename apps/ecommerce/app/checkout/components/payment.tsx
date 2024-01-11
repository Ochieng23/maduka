'use client';

// Import necessary dependencies
import React from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

// PaymentForm component
export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  // Handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement('card');

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post('/api/create-payment-intent', {
        data: { amount: 89 },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Payment form */}
      <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 m-10 p-4 mt-4 border-2 " onSubmit={onSubmit}>
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          {/* Email address */}
          <div className="col-span-full">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1">
              <input type="email" id="email-address" name="email-address" autoComplete="email" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          {/* Name on card */}
          <div className="col-span-full">
            <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">Name on card</label>
            <div className="mt-1">
              <input type="text" id="name-on-card" name="name-on-card" autoComplete="cc-name" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          {/* Card Element */}
          <div className="col-span-4 sm:col-span-3">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">Card</label>
            <div className="mt-1">
              <CardElement />
            </div>
          </div>

          {/* Address */}
          <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <div className="mt-1">
              <input type="text" id="address" name="address" autoComplete="street-address" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          {/* City */}
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <div className="mt-1">
              <input type="text" id="city" name="city" autoComplete="address-level2" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          {/* State / Province */}
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">State / Province</label>
            <div className="mt-1">
              <input type="text" id="region" name="region" autoComplete="address-level1" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>

          {/* Postal code */}
          <div className="col-span-full sm:col-span-4">
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Postal code</label>
            <div className="mt-1">
              <input type="text" id="postal-code" name="postal-code" autoComplete="postal-code" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>

        {/* Billing address checkbox */}
        <div className="mt-6 flex space-x-2">
          <div className="flex h-5 items-center">
            {/* Set checked attribute based on your requirements */}
            <input id="same-as-shipping" name="same-as-shipping" type="checkbox" checked={true} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          </div>
          <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">Billing address is the same as shipping address</label>
        </div>

        {/* Submit button */}
        <button type="submit" className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Pay</button>

        {/* Payment details note */}
        <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
          <LockClosedIcon className="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Payment details stored in plain text
        </p>
      </form>
    </>
  );
}
