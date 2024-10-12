import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../services/PaymentForm'; 

const stripePromise = loadStripe('');

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            No Booking Details
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Please start your booking process from the room selection page.
          </p>
          <div className="text-center">
            <button 
              onClick={() => navigate('/user')}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Return to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Elements stripe={stripePromise}>
          <PaymentForm roomData={bookingDetails} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;