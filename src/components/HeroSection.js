import React, { useState } from 'react';
import './HeroSection.css';
import image1 from '../media/villa-simonne-main-enterance.jpg';
import image2 from '../media/rock-pool-and-our-executive.jpg';
import image3 from '../media/heated-pool-outside-bedrooms.jpg';

const HeroSection = () => {
  const images = [image1, image2, image3];

  const [currentIndex, setCurrentIndex] = useState(0);

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
      <img src={images[currentIndex]} alt="Hero Image" className="hero-image" />
      <div className="hero-overlay">
        <h1  className='slogan'>Welcome to Eldiablo</h1>
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
