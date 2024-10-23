// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
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

// const StarRating = ({ rating }) => {
//   return (
//     <div className="star-rating">
//       {[...Array(5)].map((star, index) => {
//         index += 1;
//         return (
//           <span key={index} className={index <= rating ? "on" : "off"}>
//             &#9733;
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// const BestHotels = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const q = query(collection(db, 'rooms'), where('availableDays', '>', 0));
//         const querySnapshot = await getDocs(q);
//         const roomData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log('Fetched rooms:', roomData);
//         setRooms(roomData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//         setLoading(false);
//       }
//     };

//     fetchRooms();
//   }, []);

//   const handleBookNow = (room) => {
//     navigate('/user/booking', { 
//       state: { 
//         roomData: {
//           roomId: room.id, 
//           id: room.id,
//           imageUrl: room.imageUrl,
//           roomName: room.roomName,
//           price: room.price,
//           availableDays: room.availableDays,
//           adults: room.adults,
//           children: room.children,
//           description: room.description
//         } 
//       }
//     });
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
//             <div className="rating-container">
//               <StarRating rating={Math.round(room.averageRating || 0)} />
//               <span>({room.totalRatings || 0} ratings)</span>
//             </div>
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
//               <p className='details'><strong>Description:</strong> {selectedRoom.description}</p>
//               <p className='details'><strong>Price:</strong> R {selectedRoom.price} per night</p>
//               <p className='details'><strong>Availability:</strong> {selectedRoom.availableDays} days</p>
//               <p className='details'><strong>Capacity:</strong> {selectedRoom.adults} Adults, {selectedRoom.children} Children</p>
//               <div className="rating-container">
//                 <StarRating rating={Math.round(selectedRoom.averageRating || 0)} />
//                 <span>({selectedRoom.totalRatings || 0} ratings)</span>
//               </div>
//             </div>
//             <button 
//               className="book-now-btn" 
//               onClick={() => {
//                 handleBookNow(selectedRoom);
//                 setSelectedRoom(null); 
//               }}
//             >
//               Book Now
//             </button>
//           </div>
//         )}
//       </Modal>
//     </section>
//   );
// };

// export default BestHotels;

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
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

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span key={index} className={index <= rating ? "on" : "off"}>
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

const BestHotels = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [displayCount, setDisplayCount] = useState(4); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const q = query(collection(db, 'rooms'), where('availableDays', '>', 0));
        const querySnapshot = await getDocs(q);
        const roomData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched rooms:', roomData);
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
    navigate('/user/booking', { 
      state: { 
        roomData: {
          roomId: room.id, 
          id: room.id,
          imageUrl: room.imageUrl,
          roomName: room.roomName,
          price: room.price,
          availableDays: room.availableDays,
          adults: room.adults,
          children: room.children,
          description: room.description
        } 
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <section className="best-hotels">
      <h2>Available Rooms</h2>
      <div className="hotels-container">
        {rooms.slice(0, displayCount).map((room) => (
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
            <div className="rating-container">
              <StarRating rating={Math.round(room.averageRating || 0)} />
              <span>({room.totalRatings || 0} ratings)</span>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="view-more-btn" 
        onClick={() => navigate('/user/rooms')} 
      >
        View More
      </button>

      <Modal 
        isOpen={selectedRoom !== null} 
        onClose={() => setSelectedRoom(null)}
      >
        {selectedRoom && (
          <div className="modal-room-details">
            <h2>{selectedRoom.roomName}</h2>
            <img src={selectedRoom.imageUrl} alt={selectedRoom.roomName} />
            <div className="modal-room-info">
              <p className='details'><strong>Description:</strong> {selectedRoom.description}</p>
              <p className='details'><strong>Price:</strong> R {selectedRoom.price} per night</p>
              <p className='details'><strong>Availability:</strong> {selectedRoom.availableDays} days</p>
              <p className='details'><strong>Capacity:</strong> {selectedRoom.adults} Adults, {selectedRoom.children} Children</p>
              <div className="rating-container">
                <StarRating rating={Math.round(selectedRoom.averageRating || 0)} />
                <span>({selectedRoom.totalRatings || 0} ratings)</span>
              </div>
            </div>
            <button 
              className="book-now-btn" 
              onClick={() => {
                handleBookNow(selectedRoom);
                setSelectedRoom(null); 
              }}
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
