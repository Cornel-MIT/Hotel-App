import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

const AddRoom = () => {
  const [roomName, setRoomName] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); 
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true); 

    try {

      if (!roomName || !price || !description || !image) {
        throw new Error('All fields are required');
      }

      const imageRef = ref(storage, `rooms/${image.name}`);

      await uploadBytes(imageRef, image);

      const imageUrl = await getDownloadURL(imageRef);

      const roomData = {
        roomName,
        price: Number(price), 
        description,
        imageUrl, 
        createdAt: serverTimestamp(), 
      };

      const docRef = await addDoc(collection(db, 'rooms'), roomData);
      
      console.log('Room added with ID: ', docRef.id); 

      setRoomName('');
      setPrice('');
      setDescription('');
      setImage(null);
      setShowPopup(true); 

    } catch (error) {
      console.error('Error adding room:', error);
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add a New Room</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <form onSubmit={handleAddRoom}>
        <div style={{ marginBottom: '10px' }}>
          <label>Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '5px', minHeight: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading} 
          style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Adding Room...' : 'Add Room'}
        </button>
      </form>
      <button
        onClick={() => navigate('/admin')} 
        style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Back
      </button>
      {showPopup && (
        <div style={popupStyle}>
          <p>Congratulations! You Successfully Added a New Room.</p>
          <button
            onClick={() => setShowPopup(false)} 
            style={{ padding: '5px', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  border: '2px solid black',
  borderRadius: '10px',
  textAlign: 'center',
  zIndex: 1000,
};

export default AddRoom;
