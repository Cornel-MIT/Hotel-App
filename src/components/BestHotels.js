import React from 'react';
import './BestHotels.css';
import apogeeHotelImage from '../media/villa-simonne-main-enterance.jpg';
import regencyHotelImage from '../media/villa-simonne-main-enterance.jpg';  // Change accordingly if you have different images

const hotels = [
  {
    id: 1,
    name: 'Apogee Boutique Hotel and Spa',
    image: apogeeHotelImage, 
    description: 'The magnificent Italian-styled masterpiece...',
  },
  {
    id: 2,
    name: 'The Regency Apartment Hotel Menlyn',
    image: regencyHotelImage,
    description: 'The Regency is a full-service luxury apartment...',
  },
  {
    id: 3,
    name: 'Apogee Boutique Hotel and Spa',
    image: apogeeHotelImage, 
    description: 'The magnificent Italian-styled masterpiece...',
  },
  {
    id: 4,
    name: 'The Regency Apartment Hotel Menlyn',
    image: regencyHotelImage,
    description: 'The Regency is a full-service luxury apartment...',
  },
];

const BestHotels = () => {
  return (
    <section className="best-hotels">
      <h2>Best Hotels</h2>
      <div className="hotels-container">
        {hotels.map(hotel => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
          </div>
        ))}
      </div>

      <div className="explore-button-container">
        <button className="explore-btn">Explore</button>
      </div>
    </section>
  );
}

export default BestHotels;
