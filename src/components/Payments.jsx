import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const Payment = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios.post('/api/payment/create-payment-intent', { amount })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error('Error fetching client secret:', error);
      });
  }, [amount]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
  
    setProcessing(true);
  
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });
  
    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
  
      // Redirect to booking details page
      const bookingId = payload.paymentIntent.metadata.bookingId; // Assuming you store the booking ID in the metadata
      window.location.href = `/booking/${bookingId}`;
    }
  };

  return (
    <div className="payment-container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
          onChange={handleChange}
        />
        <button
          id="submit"
          disabled={processing || disabled || succeeded}
          className="payment-button"
        >
          {processing ? (
            <div className="spinner" id="spinner" />
          ) : (
            <span id="button-text">Pay now</span>
          )}
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded
        </p>
      </form>
    </div>
  );
};

export default Payment;
