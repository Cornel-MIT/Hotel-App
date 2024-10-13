import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state?.roomData || {
    id: '',
    imageUrl: '',
    roomName: '',
    price: 100,
    adults: 2,
    children: 1,
    availableDays: 30,
    description: '',
  };

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(roomData.price);
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
  }, [checkIn, checkOut, roomData.price]);

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

  return (
    <div className="booking-container">
      <div className="booking-content">
        <img src={roomData.imageUrl} alt={roomData.roomName} className="room-image" />
        <h1 className="room-title">{roomData.roomName}</h1>
        <h2 className="section-title">Booking</h2>
        <input
          type="date"
          placeholder="Check In mm/dd/yyyy"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="booking-input"
        />
        <input
          type="date"
          placeholder="Check Out mm/dd/yyyy"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="booking-input"
        />
        <input
          type="number"
          placeholder="Adult"
          value={roomData.adults}
          readOnly
          className="booking-input"
        />
        <input
          type="number"
          placeholder="Children"
          value={roomData.children}
          readOnly
          className="booking-input"
        />
        <input
          type="number"
          placeholder="Rooms"
          value="1"
          readOnly
          className="booking-input"
        />
        <div className="price-info">
          <p>Price per night: R {roomData.price}</p>
          <p>Total Price: R {totalPrice}</p>
          <p>Duration: {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}</p>
        </div>
        <button onClick={handleProceedToPayment} className="confirm-button">
          Confirm Booking
        </button>

        <div className="amenities">
          <h2 className="section-title">Amenities</h2>
          <div className="amenity-item">👥 2 - 5 Persons</div>
          <div className="amenity-item">📶 Free WiFi Available</div>
          <div className="amenity-item">🏊 Swimming Pools</div>
          <div className="amenity-item">🍳 Breakfast</div>
          <div className="amenity-item">📏 250 SQFT Rooms</div>
        </div>

        <div className="room-description">
          <h2 className="section-title">{roomData.roomName}</h2>
          <p>{roomData.description}</p>
        </div>

        <div className="check-info">
          <h3 className="section-title">Check In</h3>
          <p>Check-in from 9:00 AM - anytime</p>
          <p>Early check-in subject to availability</p>

          <h3 className="section-title">Check Out</h3>
          <p>Check-out before noon</p>
          <p>Check-out from 9:00 AM - anytime</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;