import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state?.roomData;

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(roomData?.price || 0);
  const [numberOfDays, setNumberOfDays] = useState(1);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfDays(diffDays);
      setTotalPrice(roomData.price * diffDays);
    }
  }, [checkIn, checkOut, roomData?.price]);

  const handleProceedToPayment = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates before proceeding to payment.");
      return;
    }

    const bookingDetails = {
      ...roomData,
      checkIn,
      checkOut,
      totalPrice,
      numberOfDays
    };

     navigate('/user/booking/payment', { state: { bookingDetails } });
  };

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
                <span className="font-semibold text-gray-700">Total Price</span>
                <p className="text-2xl font-bold text-blue-500">R {totalPrice}</p>
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
              <div className="bg-gray-50 p-4 rounded">
                <span className="font-semibold text-gray-700">Duration</span>
                <p className="text-lg">{numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded mb-6">
              <span className="font-semibold text-gray-700">Description</span>
              <p className="mt-2 text-gray-600">{roomData.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors duration-300"
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;