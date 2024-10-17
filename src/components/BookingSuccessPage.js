// import React, { useEffect, useState } from 'react';
// import { useLocation, Link, useNavigate } from 'react-router-dom';
// import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
// import { db } from '../firebase';
// import './BookingSuccessPage.css';

// const BookingSuccessPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isBookingProcessed, setIsBookingProcessed] = useState(false);
//   const [error, setError] = useState(null);
//   const bookingDetails = location.state?.bookingDetails;

//   useEffect(() => {
//     const addBookedRoom = async () => {
//       if (bookingDetails && !isBookingProcessed) {
//         try {
//           console.log('Processing booking:', bookingDetails);

//           if (!bookingDetails.roomId) {
//             throw new Error('Room ID is missing from booking details');
//           }

//           await setDoc(doc(db, 'bookedRooms', bookingDetails.roomId), {
//             ...bookingDetails,
//             bookingDate: new Date().toISOString(),
//             daysRemaining: bookingDetails.numberOfDays
//           });

//           console.log('Added to bookedRooms collection');

//           const roomRef = doc(db, 'rooms', bookingDetails.roomId);
//           await updateDoc(roomRef, {
//             availableDays: increment(-bookingDetails.numberOfDays)
//           });

//           console.log('Updated room availability');

//           setIsBookingProcessed(true);
//         } catch (error) {
//           console.error('Error updating Firestore:', error);
//           setError(error.message);
//         }
//       }
//     };

//     addBookedRoom();
//   }, [bookingDetails, isBookingProcessed]);

//   if (error) {
//     return (
//       <div className="booking-success-container error">
//         <h1>Error</h1>
//         <p>An error occurred while processing your booking: {error}</p>
//         <p>Please contact customer support for assistance.</p>
//         <Link to="/booking" className="button">Return to Booking</Link>
//       </div>
//     );
//   }

//   if (!bookingDetails) {
//     return (
//       <div className="booking-success-container error">
//         <h1>Error</h1>
//         <p>No booking details found. Please try making a reservation again.</p>
//         <Link to="/booking" className="button">Return to Booking</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="booking-success-container">
//       <h1>Booking Confirmed!</h1>
//       <div className="success-icon">✅</div>
//       <p>Thank you for your booking. Your payment was successful.</p>
//       <div className="booking-details">
//         <h2>Booking Details</h2>
//         <p><strong>Room:</strong> {bookingDetails.roomName}</p>
//         <p><strong>Check-in:</strong> {bookingDetails.checkIn}</p>
//         <p><strong>Check-out:</strong> {bookingDetails.checkOut}</p>
//         <p><strong>Total Price:</strong> R {bookingDetails.totalPrice}</p>
//         <p><strong>Number of Days:</strong> {bookingDetails.numberOfDays}</p>
//       </div>
//       <p>A confirmation email has been sent to your registered email address.</p>
//       <Link to="/user" className="button">Return to Home</Link>
//     </div>
//   );
// };

// export default BookingSuccessPage;


import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Import Firebase Auth
import './BookingSuccessPage.css';

const BookingSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isBookingProcessed, setIsBookingProcessed] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);  // Store the current user
  const bookingDetails = location.state?.bookingDetails;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set the current user when authenticated
      } else {
        navigate('/login');  // Redirect to login if no user is authenticated
      }
    });

    return () => unsubscribe();  // Clean up listener
  }, [navigate]);

  useEffect(() => {
    const addBookedRoom = async () => {
      if (bookingDetails && !isBookingProcessed && user) {  // Ensure user is authenticated
        try {
          console.log('Processing booking:', bookingDetails);

          if (!bookingDetails.roomId) {
            throw new Error('Room ID is missing from booking details');
          }

          // Save booking details to the Firestore collection 'bookedRooms'
          await setDoc(doc(db, 'bookedRooms', bookingDetails.roomId), {
            ...bookingDetails,
            userId: user.uid,  // Include the user ID in booking
            bookingDate: new Date().toISOString(),
            daysRemaining: bookingDetails.numberOfDays
          });

          console.log('Added to bookedRooms collection');

          // Update room availability in the 'rooms' collection
          const roomRef = doc(db, 'rooms', bookingDetails.roomId);
          await updateDoc(roomRef, {
            availableDays: increment(-bookingDetails.numberOfDays)
          });

          console.log('Updated room availability');
          setIsBookingProcessed(true);
        } catch (error) {
          console.error('Error updating Firestore:', error);
          setError(error.message);
        }
      }
    };

    addBookedRoom();
  }, [bookingDetails, isBookingProcessed, user]);

  if (error) {
    return (
      <div className="booking-success-container error">
        <h1>Error</h1>
        <p>An error occurred while processing your booking: {error}</p>
        <p>Please contact customer support for assistance.</p>
        <Link to="/booking" className="button">Return to Booking</Link>
      </div>
    );
  }

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
