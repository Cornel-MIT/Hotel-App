import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

const Hotel = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRoom, setEditRoom] = useState(null); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'rooms'));
        const roomList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleEditRoom = async (roomId) => {
    const updatedRoom = {
      ...editRoom, 
    };

    try {
      const roomDoc = doc(db, 'rooms', roomId);
      await updateDoc(roomDoc, updatedRoom);
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, ...updatedRoom } : room
        )
      );
      setEditRoom(null);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteDoc(doc(db, 'rooms', roomId));
      setRooms((prevRooms) => prevRooms.filter(room => room.id !== roomId)); // Remove room from state
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {rooms.map((room) => (
        <div key={room.id} style={cardStyle}>
          <img src={room.imageUrl} alt={room.roomName} style={imageStyle} />
          {editRoom && editRoom.id === room.id ? (
            <div>
              <input
                type="text"
                value={editRoom.roomName}
                onChange={(e) => setEditRoom({ ...editRoom, roomName: e.target.value })}
              />
              <textarea
                value={editRoom.description}
                onChange={(e) => setEditRoom({ ...editRoom, description: e.target.value })}
              />
              <input
                type="number"
                value={editRoom.price}
                onChange={(e) => setEditRoom({ ...editRoom, price: e.target.value })}
              />
              <button onClick={() => handleEditRoom(room.id)}>Save</button>
              <button onClick={() => setEditRoom(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{room.roomName}</h3>
              <p>{room.description}</p>
              <p><strong>Price: </strong>R {room.price}</p>
              <button onClick={() => setEditRoom(room)}>Edit</button>
              <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  width: '300px',
  textAlign: 'center',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
};

export default Hotel;

