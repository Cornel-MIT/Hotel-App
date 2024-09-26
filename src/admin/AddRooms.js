import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
const AddRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rooms'), {
        roomName,
        price,
        description,
        image: base64Image,
      });
      setShowPopup(true);
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <h2>Add a New Room</h2>
      <form onSubmit={handleAddRoom}>
        <div>
          <label>Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Add Room</button>
      </form>
      <button onClick={() => navigate('/admin')} style={{ marginTop: '10px' }}>Back</button>
      {showPopup && (
        <div style={popupStyle}>
          <p>Congratulations! You Successfully Added a New Room.</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
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
};
export default AddRoom;