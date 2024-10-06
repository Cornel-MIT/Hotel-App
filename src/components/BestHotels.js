// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase'; 
// import './BestHotels.css';

// const BestHotels = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'rooms'));
//         const roomData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setRooms(roomData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <section className="best-hotels">
//       <h2>Available Rooms</h2>
//       <div className="hotels-container">
//         {rooms.map((room) => (
//           <div key={room.id} className="hotel-card">
//             <img src={room.imageUrl} alt={room.roomName} />
//             <h3>{room.roomName}</h3>
//             <p>{room.description}</p>
//             <p>Price: <strong>R</strong> {room.price} per night</p>
//             <p>Available for {room.availableDays} days</p>
//             <p>Adults: {room.adults}, Children: {room.children}</p>
//           </div>
//         ))}
//       </div>

//       <div className="explore-button-container">
//         <button className="explore-btn">Explore</button>
//       </div>
//     </section>
//   );
// };

// export default BestHotels;


// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { Link } from 'react-router-dom';  
// import { db } from '../firebase'; 
// import './BestHotels.css';

// const BestHotels = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'rooms'));
//         const roomData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setRooms(roomData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <section className="best-hotels">
//       <h2>Available Rooms</h2>
//       <div className="hotels-container">
//         {rooms.map((room) => (
//           <Link key={room.id} to={`/rooms/${room.id}`} className="hotel-card-link">  {/* Wrap the card with Link */}
//             <div className="hotel-card">
//               <img src={room.imageUrl} alt={room.roomName} />
//               <h3>{room.roomName}</h3>
//               <p>{room.description}</p>
//               <p>Price: <strong>R</strong> {room.price} per night</p>
//               <p>Available for {room.availableDays} days</p>
//               <p>Adults: {room.adults}, Children: {room.children}</p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <div className="explore-button-container">
//         <button className="explore-btn">Explore</button>
//       </div>
//     </section>
//   );
// };

// export default BestHotels;


// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase'; 
// import './BestHotels.css';

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <button className="modal-close" onClick={onClose}>×</button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const BestHotels = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'rooms'));
//         const roomData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setRooms(roomData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, []);

//   const handleBookNow = (roomId) => {
//     // Handle booking logic here
//     console.log('Booking room:', roomId);
//     setSelectedRoom(null); // Close the modal after booking
//   };

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   return (
//     <section className="best-hotels">
//       <h2>Available Rooms</h2>
//       <div className="hotels-container">
//         {rooms.map((room) => (
//           <div 
//             key={room.id} 
//             className="hotel-card" 
//             onClick={() => setSelectedRoom(room)}
//           >
//             <img src={room.imageUrl} alt={room.roomName} />
//             <h3>{room.roomName}</h3>
//             <p>{room.description}</p>
//             <p>Price: <strong>R</strong> {room.price} per night</p>
//             <p>Available for {room.availableDays} days</p>
//             <p>Adults: {room.adults}, Children: {room.children}</p>
//           </div>
//         ))}
//       </div>

//       <Modal 
//         isOpen={selectedRoom !== null} 
//         onClose={() => setSelectedRoom(null)}
//       >
//         {selectedRoom && (
//           <div className="modal-room-details">
//             <h2>{selectedRoom.roomName}</h2>
//             <img src={selectedRoom.imageUrl} alt={selectedRoom.roomName} />
//             <div className="modal-room-info">
//               <p><strong>Description:</strong> {selectedRoom.description}</p>
//               <p><strong>Price:</strong> R {selectedRoom.price} per night</p>
//               <p><strong>Availability:</strong> {selectedRoom.availableDays} days</p>
//               <p><strong>Capacity:</strong> {selectedRoom.adults} Adults, {selectedRoom.children} Children</p>
//             </div>
//             <button 
//               className="book-now-btn" 
//               onClick={() => handleBookNow(selectedRoom.id)}
//             >
//               Book Now
//             </button>
//           </div>
//         )}
//       </Modal>

//       <div className="explore-button-container">
//         <button className="explore-btn">Explore</button>
//       </div>
//     </section>
//   );
// };

// export default BestHotels;

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import './BestHotels.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const BestHotels = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const roomData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room) => {
    navigate('/booking', { state: { roomData: room } });
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <section className="best-hotels">
      <h2>Available Rooms</h2>
      <div className="hotels-container">
        {rooms.map((room) => (
          <div 
            key={room.id} 
            className="hotel-card" 
            onClick={() => setSelectedRoom(room)}
          >
            <img src={room.imageUrl} alt={room.roomName} />
            <h3>{room.roomName}</h3>
            <p>{room.description}</p>
            <p>Price: <strong>R</strong> {room.price} per night</p>
            <p>Available for {room.availableDays} days</p>
            <p>Adults: {room.adults}, Children: {room.children}</p>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={selectedRoom !== null} 
        onClose={() => setSelectedRoom(null)}
      >
        {selectedRoom && (
          <div className="modal-room-details">
            <h2>{selectedRoom.roomName}</h2>
            <img src={selectedRoom.imageUrl} alt={selectedRoom.roomName} />
            <div className="modal-room-info">
              <p><strong>Description:</strong> {selectedRoom.description}</p>
              <p><strong>Price:</strong> R {selectedRoom.price} per night</p>
              <p><strong>Availability:</strong> {selectedRoom.availableDays} days</p>
              <p><strong>Capacity:</strong> {selectedRoom.adults} Adults, {selectedRoom.children} Children</p>
            </div>
            <button 
              className="book-now-btn" 
              onClick={() => handleBookNow(selectedRoom)}
            >
              Book Now
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default BestHotels;