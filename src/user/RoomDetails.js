import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RoomDetails = () => {
  const { roomId } = useParams();  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const docRef = doc(db, 'rooms', roomId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRoom(docSnap.data());
        } else {
          console.error('No such document!');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (loading) {
    return <div>Loading room details...</div>;
  }

  if (!room) {
    return <div>Room not found!</div>;
  }

  return (
    <div className="room-details">
      <h1>{room.roomName}</h1>
      <img src={room.imageUrl} alt={room.roomName} />
      <p>{room.description}</p>
      <p>Price: <strong>R</strong> {room.price} per night</p>
      <p>Available for {room.availableDays} days</p>
      <p>Adults: {room.adults}, Children: {room.children}</p>
    </div>
  );
};

export default RoomDetails;
