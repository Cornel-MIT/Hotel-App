import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const PaymentForm = ({ roomData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [cardBrand, setCardBrand] = useState('');
  
  const functions = getFunctions();
  const createPaymentIntent = httpsCallable(functions, 'createPaymentIntent');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError('Stripe has not been initialized.');
      setProcessing(false);
      return;
    }

    try {
      const result = await createPaymentIntent({
        amount: roomData.totalPrice * 100, 
        roomId: roomData.id,
        checkIn: roomData.checkIn,
        checkOut: roomData.checkOut
      });

      const clientSecret = result.data.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: roomData.customerName || 'Guest'
          },
        }
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else {

        const bookingRef = doc(db, 'bookings', paymentResult.paymentIntent.id);
        await setDoc(bookingRef, {
          roomId: roomData.id,
          roomName: roomData.roomName,
          checkIn: roomData.checkIn,
          checkOut: roomData.checkOut,
          totalPrice: roomData.totalPrice,
          paymentIntentId: paymentResult.paymentIntent.id,
          status: 'confirmed',
          createdAt: serverTimestamp()
        });

        navigate('/booking-success', { 
          state: { 
            bookingDetails: {
              ...roomData,
              paymentIntentId: paymentResult.paymentIntent.id
            }
          }
        });
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setProcessing(false);
    }
  };

  const inputStyle = {
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
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const iconStyle = {
    marginRight: '8px',
    fontSize: '24px',
  };

  const getCardIcon = (brand) => {
    switch (brand) {
      case 'visa': return '🔵';
      case 'mastercard': return '🔴';
      case 'amex': return '🟢';
      case 'discover': return '🟠';
      case 'diners': return '⚪️';
      case 'jcb': return '🟣';
      case 'unionpay': return '🟡';
      default: return '💳';
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Secure Payment</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <h3>Booking Summary</h3>
          <p>Room: {roomData.roomName}</p>
          <p>Check-in: {roomData.checkIn}</p>
          <p>Check-out: {roomData.checkOut}</p>
          <p>Total: R {roomData.totalPrice}</p>
        </div>
        
        <label style={labelStyle}>
          <span style={iconStyle}>{getCardIcon(cardBrand)}</span> Card Number
        </label>
        <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
          <CardNumberElement 
            options={{ 
              style: inputStyle,
              showIcon: true,
            }}
            onChange={(e) => {
              if (e.brand) {
                setCardBrand(e.brand);
              }
            }}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '48%' }}>
            <label style={labelStyle}>
              <span style={iconStyle}>📅</span> Expiration
            </label>
            <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '4px' }}>
              <CardExpiryElement options={{ style: inputStyle }} />
            </div>
          </div>
          <div style={{ width: '48%' }}>
            <label style={labelStyle}>
              <span style={iconStyle}>🔒</span> CVC
            </label>
            <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '4px' }}>
              <CardCvcElement options={{ style: inputStyle }} />
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={!stripe || processing}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !stripe || processing ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            opacity: (!stripe || processing) ? 0.7 : 1,
          }}
        >
          {processing ? 'Processing...' : `Pay R ${roomData.totalPrice}`}
        </button>
      </form>
      {error && <div style={{ color: '#9e2146', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
    </div>
  );
};

export default PaymentForm;