import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

const Hotels = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const roomsRef = ref(db, 'hotels'); 
    onValue(roomsRef, (snapshot) => {
      const roomsData = snapshot.val();
      const roomsArray = roomsData ? Object.values(roomsData) : [];
      setRooms(roomsArray);
    });
  }, []);

  return (
    <div className="hotels-container">
      <h1>Available Rooms</h1>
      <div className="room-cards-container">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.sys.id} className="room-card">
              <h3>{room.fields.name}</h3>
              <p>{room.fields.description}</p>
              <p><strong>Price:</strong> ${room.fields.price}</p>
              <p><strong>Size:</strong> {room.fields.size} sq ft</p>
              <div className="room-images">
                {room.fields.images.map((img, index) => (
                  <img key={index} src={img.fields.file.url} alt={`Room ${index + 1}`} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
