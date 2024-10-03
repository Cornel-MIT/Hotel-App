// import React from 'react';
// import './BestHotels.css';
// import apogeeHotelImage from '../media/villa-simonne-main-enterance.jpg';
// import regencyHotelImage from '../media/villa-simonne-main-enterance.jpg';  // Change accordingly if you have different images

// const hotels = [
//   {
//     id: 1,
//     name: 'Apogee Boutique Hotel and Spa',
//     image: apogeeHotelImage, 
//     description: 'The magnificent Italian-styled masterpiece...',
//   },
//   {
//     id: 2,
//     name: 'The Regency Apartment Hotel Menlyn',
//     image: regencyHotelImage,
//     description: 'The Regency is a full-service luxury apartment...',
//   },
//   {
//     id: 3,
//     name: 'Apogee Boutique Hotel and Spa',
//     image: apogeeHotelImage, 
//     description: 'The magnificent Italian-styled masterpiece...',
//   },
//   {
//     id: 4,
//     name: 'The Regency Apartment Hotel Menlyn',
//     image: regencyHotelImage,
//     description: 'The Regency is a full-service luxury apartment...',
//   },
// ];

// const BestHotels = () => {
//   return (
//     <section className="best-hotels">
//       <h2>Best Hotels</h2>
//       <div className="hotels-container">
//         {hotels.map(hotel => (
//           <div key={hotel.id} className="hotel-card">
//             <img src={hotel.image} alt={hotel.name} />
//             <h3>{hotel.name}</h3>
//             <p>{hotel.description}</p>
//           </div>
//         ))}
//       </div>

//       <div className="explore-button-container">
//         <button className="explore-btn">Explore</button>
//       </div>
//     </section>
//   );
// }

// export default BestHotels;




import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
          <div key={room.id} className="hotel-card">
            <img src={room.imageUrl} alt={room.roomName} />
            <h3>{room.roomName}</h3>
            <p>{room.description}</p>
            <p>Price: ${room.price}</p>
            <p>Available for {room.availableDays} days</p>
            <p>Adults: {room.adults}, Children: {room.children}</p>
          </div>
        ))}
      </div>

      <div className="explore-button-container">
        <button className="explore-btn">Explore</button>
      </div>
    </section>
  );
};

export default BestHotels;
