import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore'; 
import { db } from '../firebase';
import './HeroSection.css';

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomList = roomSnapshot.docs.map((doc) => doc.data());

      const roomImages = roomList.map((room) => room.imageUrl); 
      setImages(roomImages);
    };

    fetchRooms();
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); 

    return () => clearInterval(interval); 
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="hero-section">
      {images.length > 0 && (
        <img src={images[currentIndex]} alt="Room Image" className="hero-image" />
      )}
      <div className="hero-overlay">
        <h1 className='slogan'>Welcome to Eldiablo</h1>
        <p>Welcome to Eldiablo where we take care of all your desires</p>
      </div>
      <button className="prev" onClick={prevImage}>
        &#10094;
      </button>
      <button className="next" onClick={nextImage}>
        &#10095;
      </button>
    </div>
  );
};

export default HeroSection;
