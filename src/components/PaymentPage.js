import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import './PaymentForm.css';

const stripePromise = loadStripe('myKey');

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  const [error, setError] = useState(null);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleCardChange = (event) => {
    setCardError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: bookingDetails.name, 
        email: bookingDetails.email, 
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      setSucceeded(false);
    } else {
      setError(null);
      setSucceeded(true);
      console.log('Payment successful!', paymentMethod);

      setTimeout(() => {
        navigate('/user/booking-success', { state: { bookingDetails } });
      }, 2000); 
    }
  };

  if (!bookingDetails) {
    return <div className="error-message">Error: No booking details found.</div>;
  }

  return (
    <div className="payment-form-container">
      <h2>Complete Your Payment</h2>
      <div className="booking-summary">
        <h3>Booking Summary</h3>
        <p>Room: {bookingDetails.roomName}</p>
        <p>Check-in: {bookingDetails.checkIn}</p>
        <p>Check-out: {bookingDetails.checkOut}</p>
        <p>Total Price: R {bookingDetails.totalPrice}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="card-element">Credit or debit card</label>
          <CardElement 
            id="card-element" 
            onChange={handleCardChange}
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
          />
        </div>
        {cardError && <div className="card-error">{cardError}</div>}
        {error && <div className="error-message">{error}</div>}
        {succeeded && <div className="success-message">Payment successful!</div>}
        <button 
          type="submit" 
          disabled={!stripe || processing || succeeded}
          className={`pay-button ${(processing || succeeded) ? 'disabled' : ''}`}
        >
          {processing ? 'Processing...' : succeeded ? 'Payment Successful' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const StripePaymentForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default StripePaymentForm;