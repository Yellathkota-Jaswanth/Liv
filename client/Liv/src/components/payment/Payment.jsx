import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QCONGRw6Tz3xT0RvNfS3IrTdVAgQbpVFMb7z1jPHUoWZUqtknYeL9enA5YlVMx1hZZS0y8EAAI3pne9OUJ1wOk1006P92YobF');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setPaymentProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error(error);
      setPaymentProcessing(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/payments', {
        paymentMethodId: paymentMethod.id,
      });
      alert('Payment successful');
    } catch (error) {
      console.error('Payment error', error);
    }

    setPaymentProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <CardElement className="border p-2 mb-4" />
      <button
        type="submit"
        disabled={!stripe || paymentProcessing}
        className="bg-blue-500 text-white px-4 py-2"
      >
        {paymentProcessing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
