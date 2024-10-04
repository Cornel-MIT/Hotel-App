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


import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';  
import { db } from '../firebase'; 
import './BestHotels.css';

const BestHotels = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <section className="best-hotels">
      <h2>Available Rooms</h2>
      <div className="hotels-container">
        {rooms.map((room) => (
          <Link key={room.id} to={`/rooms/${room.id}`} className="hotel-card-link">  {/* Wrap the card with Link */}
            <div className="hotel-card">
              <img src={room.imageUrl} alt={room.roomName} />
              <h3>{room.roomName}</h3>
              <p>{room.description}</p>
              <p>Price: <strong>R</strong> {room.price} per night</p>
              <p>Available for {room.availableDays} days</p>
              <p>Adults: {room.adults}, Children: {room.children}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="explore-button-container">
        <button className="explore-btn">Explore</button>
      </div>
    </section>
  );
};

export default BestHotels;
