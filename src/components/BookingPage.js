import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../services/PaymentForm';

const stripePromise = loadStripe('your_publishable_key_here');

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state?.roomData;

  if (!roomData) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            No Room Selected
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Please select a room from our available options to proceed with booking.
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-blue-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Booking Details
            </h1>
          </div>

          <div className="relative h-64 sm:h-96">
            <img 
              src={roomData.imageUrl} 
              alt={roomData.roomName} 
              className="absolute h-full w-full object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {roomData.roomName}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <span className="font-semibold text-gray-700">Price per night</span>
                <p className="text-2xl font-bold text-blue-500">R {roomData.price}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <span className="font-semibold text-gray-700">Availability</span>
                <p className="text-lg">{roomData.availableDays} days</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <span className="font-semibold text-gray-700">Guests</span>
                <p className="text-lg">{roomData.adults} Adults, {roomData.children} Children</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <span className="font-semibold text-gray-700">Room ID</span>
                <p className="text-lg">{roomData.id}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded mb-6">
              <span className="font-semibold text-gray-700">Description</span>
              <p className="mt-2 text-gray-600">{roomData.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Payment Details
            </h2>
            <Elements stripe={stripePromise}>
              <PaymentForm roomData={roomData} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;