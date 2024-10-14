import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './BookingSuccessPage.css';

const BookingSuccessPage = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return (
      <div className="booking-success-container error">
        <h1>Error</h1>
        <p>No booking details found. Please try making a reservation again.</p>
        <Link to="/booking" className="button">Return to Booking</Link>
      </div>
    );
  }

  return (
    <div className="booking-success-container">
      <h1>Booking Confirmed!</h1>
      <div className="success-icon">✅</div>
      <p>Thank you for your booking. Your payment was successful.</p>
      <div className="booking-details">
        <h2>Booking Details</h2>
        <p><strong>Room:</strong> {bookingDetails.roomName}</p>
        <p><strong>Check-in:</strong> {bookingDetails.checkIn}</p>
        <p><strong>Check-out:</strong> {bookingDetails.checkOut}</p>
        <p><strong>Total Price:</strong> R {bookingDetails.totalPrice}</p>
        <p><strong>Number of Days:</strong> {bookingDetails.numberOfDays}</p>
      </div>
      <p>A confirmation email has been sent to your registered email address.</p>
      <Link to="/user" className="button">Return to Home</Link>
    </div>
  );
};

export default BookingSuccessPage;