import React from 'react';
import BookingForm from './BookingForm';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Our Hotel</h1>
      <p>Browse available rooms and make a booking for your next stay.</p>
      <BookingForm />
    </div>
  );
};

export default Home;