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
        userBookings.push(doc.data());
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
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking, index) => (
              <li key={index}>
                <strong>Room:</strong> {booking.roomName} <br />
                <strong>Check-in:</strong> {booking.checkIn} <br />
                <strong>Check-out:</strong> {booking.checkOut} <br />
                <strong>Total Price:</strong> R {booking.totalPrice} <br />
                <strong>Days:</strong> {booking.numberOfDays}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

