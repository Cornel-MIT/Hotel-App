// import React, { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import './Styles/Profile.css'; 

// const UserProfile = () => {
//   const [user, setUser] = useState(null); 
//   const [profileData, setProfileData] = useState(null); 
//   const [bookings, setBookings] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     contact: '',
//   });

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchUserProfile(currentUser.uid);
//         fetchUserBookings(currentUser.uid);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchUserProfile = async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, 'users', userId));
//       if (userDoc.exists()) {
//         const data = userDoc.data();
//         setProfileData(data);
//         setFormData({
//           firstName: data.firstName || '',
//           lastName: data.lastName || '',
//           email: data.email || '',
//           contact: data.contact || '',
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const fetchUserBookings = async (userId) => {
//     try {
//       const bookingsRef = collection(db, 'bookedRooms');
//       const q = query(bookingsRef, where('userId', '==', userId));
//       const querySnapshot = await getDocs(q);

//       const userBookings = [];
//       querySnapshot.forEach((doc) => {
//         userBookings.push(doc.data());
//       });
//       setBookings(userBookings);
//     } catch (error) {
//       console.error('Error fetching user bookings:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const saveProfile = async () => {
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, formData);
//       setIsEditing(false);
//       setProfileData(formData); 
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleLogout = async () => {
//     const auth = getAuth();
//     await signOut(auth);
//     setUser(null);
//     setProfileData(null);
//     setBookings([]);
//   };

//   return (
//     <div className="user-profile-container">
//       <h1>User Profile</h1>

//       {user && profileData ? (
//         <div className="profile-section">
//           <img
//             src={profileData.photoURL || 'https://via.placeholder.com/150'}
//             alt="Profile"
//             className="profile-picture"
//           />
//           <div className="profile-details">
//             {isEditing ? (
//               <>
//                 <div className="form-group">
//                   <label>First Name:</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Last Name:</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Contact:</label>
//                   <input
//                     type="text"
//                     name="contact"
//                     value={formData.contact}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button onClick={saveProfile} className="button save-button">
//                   Save
//                 </button>
//                 <button onClick={toggleEdit} className="button cancel-button">
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong> {profileData.lastName}</p>
//                 <p><strong>Email:</strong> {profileData.email}</p>
//                 <p><strong>Contact:</strong> {profileData.contact || 'N/A'}</p>
//                 <button onClick={toggleEdit} className="button edit-button">
//                   Edit Profile
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading user profile...</p>
//       )}

//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <div className="bookings-section">
//         <h2>Booking History</h2>
//         {bookings.length > 0 ? (
//           <ul>
//             {bookings.map((booking, index) => (
//               <li key={index}>
//                 <strong>Room:</strong> {booking.roomName} <br />
//                 <strong>Check-in:</strong> {booking.checkIn} <br />
//                 <strong>Check-out:</strong> {booking.checkOut} <br />
//                 <strong>Total Price:</strong> R {booking.totalPrice} <br />
//                 <strong>Days:</strong> {booking.numberOfDays}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No bookings found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Styles/Profile.css'; 

const UserProfile = () => {
  const [user, setUser] = useState(null); 
  const [profileData, setProfileData] = useState(null); 
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserProfile(currentUser.uid);
        fetchUserBookings(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfileData(data);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          contact: data.contact || '',
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserBookings = async (userId) => {
    try {
      const bookingsRef = collection(db, 'bookedRooms');
      const q = query(bookingsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const userBookings = [];
      querySnapshot.forEach((doc) => {
        userBookings.push({ id: doc.id, ...doc.data() });
      });
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, formData);
      setIsEditing(false);
      setProfileData(formData); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
    setProfileData(null);
    setBookings([]);
  };

  const handleRating = async (bookingId, roomId, rating) => {
    try {
      // Update the booking with the new rating
      const bookingRef = doc(db, 'bookedRooms', bookingId);
      await updateDoc(bookingRef, { rating });

      // Update the room's average rating
      const roomRef = doc(db, 'rooms', roomId);
      const roomDoc = await getDoc(roomRef);
      const roomData = roomDoc.data();
      
      const newTotalRatings = (roomData.totalRatings || 0) + 1;
      const newAverageRating = ((roomData.averageRating || 0) * (newTotalRatings - 1) + rating) / newTotalRatings;

      await updateDoc(roomRef, {
        averageRating: newAverageRating,
        totalRatings: newTotalRatings
      });

      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, rating } : booking
      ));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const StarRating = ({ rating, onRating }) => {
    return (
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= rating ? "on" : "off"}
              onClick={() => onRating(index)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>

      {user && profileData ? (
        <div className="profile-section">
          <img
            src={profileData.photoURL || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-details">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Contact:</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={saveProfile} className="button save-button">
                  Save
                </button>
                <button onClick={toggleEdit} className="button cancel-button">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p><strong>First Name:</strong> {profileData.firstName}</p>
                <p><strong>Last Name:</strong> {profileData.lastName}</p>
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Contact:</strong> {profileData.contact || 'N/A'}</p>
                <button onClick={toggleEdit} className="button edit-button">
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}

      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <div className="bookings-section">
        <h2>Booking History</h2>
        <div className="booking-cards">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <img src={booking.roomImageUrl} alt={booking.roomName} className="room-image" />
              <h3>{booking.roomName}</h3>
              <p><strong>Check-in:</strong> {booking.checkIn}</p>
              <p><strong>Check-out:</strong> {booking.checkOut}</p>
              <p><strong>Total Price:</strong> R {booking.totalPrice}</p>
              <p><strong>Days:</strong> {booking.numberOfDays}</p>
              <div className="rating-section">
                <p>Rate this room:</p>
                <StarRating 
                  rating={booking.rating || 0} 
                  onRating={(rating) => handleRating(booking.id, booking.roomId, rating)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;




// import React, { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
// import { db } from '../firebase';
// import './Styles/Profile.css'; 

// const UserProfile = () => {
//   const [user, setUser] = useState(null); 
//   const [profileData, setProfileData] = useState(null); 
//   const [bookings, setBookings] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     contact: '',
//   });

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchUserProfile(currentUser.uid);
//         fetchUserBookings(currentUser.uid);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const fetchUserProfile = async (userId) => {
//     try {
//       const userDoc = await getDoc(doc(db, 'users', userId));
//       if (userDoc.exists()) {
//         const data = userDoc.data();
//         setProfileData(data);
//         setFormData({
//           firstName: data.firstName || '',
//           lastName: data.lastName || '',
//           email: data.email || '',
//           contact: data.contact || '',
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const fetchUserBookings = async (userId) => {
//     try {
//       const bookingsRef = collection(db, 'bookedRooms');
//       const q = query(bookingsRef, where('userId', '==', userId));
//       const querySnapshot = await getDocs(q);

//       const userBookings = [];
//       querySnapshot.forEach((doc) => {
//         userBookings.push({ id: doc.id, ...doc.data() });
//       });
//       console.log('Fetched bookings:', userBookings); 
//       setBookings(userBookings);
//     } catch (error) {
//       console.error('Error fetching user bookings:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const saveProfile = async () => {
//     try {
//       const userRef = doc(db, 'users', user.uid);
//       await updateDoc(userRef, formData);
//       setIsEditing(false);
//       setProfileData(formData); 
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleLogout = async () => {
//     const auth = getAuth();
//     try {
//       await signOut(auth);
//       setUser(null);
//       setProfileData(null);
//       setBookings([]);
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   const handleRating = async (bookingId, roomId, rating) => {
//     try {
//       const bookingRef = doc(db, 'bookedRooms', bookingId);
//       await updateDoc(bookingRef, { rating });

//       const roomRef = doc(db, 'rooms', roomId);
//       const roomDoc = await getDoc(roomRef);
//       const roomData = roomDoc.data();
      
//       const newTotalRatings = (roomData.totalRatings || 0) + 1;
//       const newAverageRating = ((roomData.averageRating || 0) * (newTotalRatings - 1) + rating) / newTotalRatings;

//       await updateDoc(roomRef, {
//         averageRating: newAverageRating,
//         totalRatings: newTotalRatings
//       });

//       setBookings(bookings.map(booking => 
//         booking.id === bookingId ? { ...booking, rating } : booking
//       ));
//     } catch (error) {
//       console.error('Error updating rating:', error);
//     }
//   };

//   const StarRating = ({ rating, onRating }) => {
//     return (
//       <div className="star-rating">
//         {[...Array(5)].map((star, index) => {
//           index += 1;
//           return (
//             <button
//               type="button"
//               key={index}
//               className={index <= rating ? "on" : "off"}
//               onClick={() => onRating(index)}
//             >
//               <span className="star">&#9733;</span>
//             </button>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="user-profile-container">
//       <h1>User Profile</h1>

//       {user && profileData ? (
//         <div className="profile-section">
//           <img
//             src={profileData.photoURL || 'https://via.placeholder.com/150'}
//             alt="Profile"
//             className="profile-picture"
//           />
//           <div className="profile-details">
//             {isEditing ? (
//               <>
//                 <div className="form-group">
//                   <label>First Name:</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Last Name:</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Contact:</label>
//                   <input
//                     type="text"
//                     name="contact"
//                     value={formData.contact}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <button onClick={saveProfile} className="button save-button">
//                   Save
//                 </button>
//                 <button onClick={toggleEdit} className="button cancel-button">
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong> {profileData.lastName}</p>
//                 <p><strong>Email:</strong> {profileData.email}</p>
//                 <p><strong>Contact:</strong> {profileData.contact || 'N/A'}</p>
//                 <button onClick={toggleEdit} className="button edit-button">
//                   Edit Profile
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading user profile...</p>
//       )}

//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <div className="bookings-section">
//         <h2>Booking History</h2>
//         <div className="booking-cards">
//           {bookings.map((booking) => (
//             <div key={booking.id} className="booking-card">
//               {booking.roomImageUrl ? (
//                 <img 
//                   src={booking.roomImageUrl} 
//                   alt={booking.roomName} 
//                   className="room-image" 
//                   onError={(e) => {
//                     console.error('Error loading image:', e);
//                     e.target.src = 'https://via.placeholder.com/150';
//                   }}
//                 />
//               ) : (
//                 <div className="placeholder-image">No Image Available</div>
//               )}
//               <h3>{booking.roomName}</h3>
//               <p><strong>Check-in:</strong> {booking.checkIn}</p>
//               <p><strong>Check-out:</strong> {booking.checkOut}</p>
//               <p><strong>Total Price:</strong> R {booking.totalPrice}</p>
//               <p><strong>Days:</strong> {booking.numberOfDays}</p>
//               <div className="rating-section">
//                 <p>Rate this room:</p>
//                 <StarRating 
//                   rating={booking.rating || 0} 
//                   onRating={(rating) => handleRating(booking.id, booking.roomId, rating)}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;