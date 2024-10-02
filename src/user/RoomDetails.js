import React from 'react';
import { useParams } from 'react-router-dom';

const RoomDetails = ({ rooms }) => {
  const { roomId } = useParams(); 
  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return <p>Room not found</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{room.roomName}</h2>
      <p><strong>Price:</strong> ${room.price} per night</p>
      <p><strong>Description:</strong> {room.description}</p>
      <img src={room.imageUrl} alt={room.roomName} style={{ width: '100%', height: 'auto' }} />
      <button style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
        Book Now
      </button>
    </div>
  );
};

export default RoomDetails;
