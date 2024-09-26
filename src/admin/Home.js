import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Bookings from './Bookings';
import AddRooms from './AddRooms';
import Hotels from './Hotels';
import Profile from './Profile';
import Settings from './Settings';
import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <Nav />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/add-rooms" element={<AddRooms />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

const HomeContent = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page content.</p>
    </div>
  );
}

export default Home;
