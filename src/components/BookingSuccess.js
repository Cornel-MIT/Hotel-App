import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>No booking details found</h2>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '40px auto', 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px' 
    }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Booking Confirmed!</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '48px' }}>✅</span>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Booking Details</h2>
        <p><strong>Room:</strong> {bookingDetails.roomName}</p>
        <p><strong>Check-in:</strong> {bookingDetails.checkIn}</p>
        <p><strong>Check-out:</strong> {bookingDetails.checkOut}</p>
        <p><strong>Total Paid:</strong> R {bookingDetails.totalPrice}</p>
        <p><strong>Booking Reference:</strong> {bookingDetails.paymentIntentId}</p>
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link to="/" style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;