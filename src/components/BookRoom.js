import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';


const Bookings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });
  
  const { roomId } = useParams();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        roomId,
        userId: user.uid,
        timestamp: new Date(),
      });
      alert('Booking Successful!');
      navigate('/profile');
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book the room. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Your Room</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />
        <textarea
          name="specialRequests"
          placeholder="Special Requests"
          value={formData.specialRequests}
          onChange={handleChange}
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

export default Bookings;
