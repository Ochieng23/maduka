'use client';

import { LockClosedIcon } from '@heroicons/react/20/solid';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React from 'react';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

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
    <form className="mt-6 w-50">
          <div className="grid grid-cols-12 gap-x-4 gap-y-6">
            <div className="col-span-full">
              <label for="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input type="email" id="email-address" name="email-address" autocomplete="email" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="col-span-full">
              <label for="name-on-card" className="block text-sm font-medium text-gray-700">Name on card</label>
              <div className="mt-1">
                <input type="text" id="name-on-card" name="name-on-card" autocomplete="cc-name" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="col-span-full">
              <label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label>
              <div className="mt-1">
                <input type="text" id="card-number" name="card-number" autocomplete="cc-number" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

          

            <div className="col-span-4 sm:col-span-3">
              <label for="cvc" class="block text-sm font-medium text-gray-700"></label>
              <div className="mt-1">
              <  CardElement />
              </div>
            </div>

            <div className="col-span-full">
              <label for="address" className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1">
                <input type="text" id="address" name="address" autocomplete="street-address" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="col-span-full sm:col-span-4">
              <label for="city" className="block text-sm font-medium text-gray-700">City</label>
              <div className="mt-1">
                <input type="text" id="city" name="city" autocomplete="address-level2" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="col-span-full sm:col-span-4">
              <label for="region" className="block text-sm font-medium text-gray-700">State / Province</label>
              <div className="mt-1">
                <input type="text" id="region" name="region" autocomplete="address-level1" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="col-span-full sm:col-span-4">
              <label for="postal-code" className="block text-sm font-medium text-gray-700">Postal code</label>
              <div className="mt-1">
                <input type="text" id="postal-code" name="postal-code" autocomplete="postal-code" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-2">
            <div className="flex h-5 items-center">
              <input id="same-as-shipping" name="same-as-shipping" type="checkbox" checked="" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            </div>
            <label for="same-as-shipping" className="text-sm font-medium text-gray-900">Billing address is the same as shipping address</label>
          </div>

          <button type="submit" className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Pay </button>

          <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
            <LockClosedIcon className="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Payment details stored in plain text
          </p>
        </form>
      
       
      
     
      <button className='bg-indigo-500' type="submit">Confirm Order</button>
      </>
  );
}
