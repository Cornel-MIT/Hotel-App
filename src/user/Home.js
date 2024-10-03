import React from 'react';
import BookingForm from './BookingForm';
import Header from '../components/Header';
import BestHotels from '../components/BestHotels';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import '../App.css';

const Home = () => {
  return (
    <div className='HomePage'>
      <Header />
      <h1 className=''>Welcome to Our Hotel</h1>
      <HeroSection />
      <p className='availability'>Browse available rooms and make a booking for your next stay.</p>
      <BookingForm />
      <BestHotels />
      <Footer />
    </div>
  );
};

export default Home;
