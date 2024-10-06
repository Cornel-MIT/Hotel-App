// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { db, auth } from '../firebase';
// import { collection, addDoc } from 'firebase/firestore';


// const Bookings = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     checkIn: '',
//     checkOut: '',
//     specialRequests: '',
//   });
  
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         navigate('/login');
//         return;
//       }
//       await addDoc(collection(db, 'bookings'), {
//         ...formData,
//         roomId,
//         userId: user.uid,
//         timestamp: new Date(),
//       });
//       alert('Booking Successful!');
//       navigate('/profile');
//     } catch (error) {
//       console.error('Error booking room:', error);
//       alert('Failed to book the room. Please try again.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Book Your Room</h2>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="checkIn"
//           value={formData.checkIn}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="checkOut"
//           value={formData.checkOut}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="specialRequests"
//           placeholder="Special Requests"
//           value={formData.specialRequests}
//           onChange={handleChange}
//         />
//         <button type="submit">Book Now</button>
//       </form>
//     </div>
//   );
// };

// const formStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '10px',
// };

// export default Bookings;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../services/PaymentForm';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state?.roomData;

  if (!roomData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No room data available</h2>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Return to Rooms
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        marginBottom: '40px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#424770',
        }}>Room Booking Details</h1>
        
        <img 
          src={roomData.imageUrl} 
          alt={roomData.roomName} 
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        />
        
        <h2 style={{
          textAlign: 'center',
          fontSize: '24px',
          marginBottom: '20px',
          color: '#424770',
        }}>{roomData.roomName}</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px',
          marginBottom: '20px',
        }}>
          <div style={{
            padding: '10px',
            backgroundColor: '#f7f7f7',
            borderRadius: '4px',
          }}>
            <span style={{
              fontWeight: 'bold',
              marginBottom: '5px',
              display: 'block',
              color: '#424770',
            }}>Price per night</span>
            <p>R {roomData.price}</p>
          </div>
          <div style={{
            padding: '10px',
            backgroundColor: '#f7f7f7',
            borderRadius: '4px',
          }}>
            <span style={{
              fontWeight: 'bold',
              marginBottom: '5px',
              display: 'block',
              color: '#424770',
            }}>Availability</span>
            <p>{roomData.availableDays} days</p>
          </div>
          <div style={{
            padding: '10px',
            backgroundColor: '#f7f7f7',
            borderRadius: '4px',
          }}>
            <span style={{
              fontWeight: 'bold',
              marginBottom: '5px',
              display: 'block',
              color: '#424770',
            }}>Adults</span>
            <p>{roomData.adults}</p>
          </div>
          <div style={{
            padding: '10px',
            backgroundColor: '#f7f7f7',
            borderRadius: '4px',
          }}>
            <span style={{
              fontWeight: 'bold',
              marginBottom: '5px',
              display: 'block',
              color: '#424770',
            }}>Children</span>
            <p>{roomData.children}</p>
          </div>
        </div>
        
        <div style={{
          padding: '10px',
          backgroundColor: '#f7f7f7',
          borderRadius: '4px',
        }}>
          <span style={{
            fontWeight: 'bold',
            marginBottom: '5px',
            display: 'block',
            color: '#424770',
          }}>Description</span>
          <p>{roomData.description}</p>
        </div>
      </div>

      <PaymentForm roomData={roomData} />
    </div>
  );
};

export default BookingPage;