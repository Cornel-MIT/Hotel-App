// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRoomsByAdmin } from '../redux/roomsSlice';
// import './Profile.css';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { profilePicture, userName, email } = useSelector((state) => state.user);
//   const { rooms, loading, error } = useSelector((state) => state.rooms);

//   useEffect(() => {
//     if (email) {
//       dispatch(fetchRoomsByAdmin(email));  
//     }
//   }, [email, dispatch]);

//   if (!email) {
//     return <p>Please login to view your profile</p>;
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <img src={profilePicture} alt="Profile" className="profile-picture" />
//         <h1>{userName}</h1>
//         <p>{email}</p>
//       </div>

//       <div className="rooms-section">
//         <h2>Your Added Rooms</h2>
//         {loading && <p>Loading rooms...</p>}
//         {error && <p>Error fetching rooms: {error}</p>}
//         <div className="rooms-grid">
//           {rooms.map((room) => (
//             <div key={room.id} className="room-card">
//               <img src={room.imageUrl} alt={room.roomName} className="room-image" />
//               <h3>{room.roomName}</h3>
//               <p>{room.description}</p>
//               <p><strong>Price: </strong>${room.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProfile } from '../redux/slices/profileSlice';
import './Profile.css';

const Profile = () => {
    const {
      fullName = '',
      email = '',
      profilePicture = '',
      rooms = [],
      status,
      error,
    } = useSelector((state) => state.profile || {}); 
  
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(fetchAdminProfile()).then((result) => {
          console.log('Fetched profile:', result);
        });
      }, [dispatch]);
      
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }

  return (
    <div className="profile-page">
      <h2>{fullName}'s Profile</h2>
      <img src={profilePicture || 'default-profile-pic-url.jpg'} alt="Profile" className="profile-picture" />
      <p>Email: {email}</p>
      
      <h3>Your Hotel Rooms</h3>
      <ul>
        {rooms.length === 0 ? (
          <p>No rooms added yet.</p>
        ) : (
          rooms.map((room) => (
            <li key={room.id}>
              <h4>{room.name}</h4>
              <p>{room.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Profile;
