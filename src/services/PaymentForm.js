import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [cardBrand, setCardBrand] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    // });

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          metadata: {
            roomId: roomData.id,
            roomName: roomData.roomName,
            price: roomData.price
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        console.log('PaymentMethod:', paymentMethod);
        alert('Payment successful! Room booked.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
    
    setProcessing(false);
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Payment Form</h2>
      <form onSubmit={handleSubmit}>
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
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
      {error && <div style={{ color: '#9e2146', marginTop: '10px', textAlign: 'center' }}>{error}</div>}
    </div>
  );
};

export default PaymentForm;