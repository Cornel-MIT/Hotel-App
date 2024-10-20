import React, { useState } from 'react';
import './Header.css';
import logo from '../media/Logo2-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/user/profile');
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Hotel Logo" />
        </div>

        <nav className={`nav-container ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Rooms</a></li>
            <li><a href="#">Facilities</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>

          <div className="auth-buttons">
            <button className="auth-btn" onClick={handleSignInClick}>Sign In</button>
            <button className="auth-btn register-btn" onClick={handleRegisterClick}>Register</button>
          </div>
        </nav>

        <div className="hamburger-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />} 
        </div>

        <div className="profile-icon" onClick={handleProfileClick} style={{ cursor: 'pointer', marginLeft: '20px' }}>
          <img 
            src="https://via.placeholder.com/30" 
            alt="Profile" 
            style={{ width: '30px', height: '30px', borderRadius: '50%' }} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
