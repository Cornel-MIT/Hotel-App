import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import Footer from './Footer'
import './Rooms.css'; 

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

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div>
        <section className="rooms">
         <h2>All Available Rooms</h2>
         <div className="rooms-container">
           {rooms.map((room) => (
             <div 
               key={room.id} 
               className="room-card" 
               onClick={() => navigate(`/user/booking`, { state: { roomData: room } })}
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
         
      </section>
        <Footer/>
    </div>
  );
};

export default Rooms;
