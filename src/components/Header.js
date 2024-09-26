import React from 'react';
import './Header.css'; 
import logo from '../media/Logo2.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Hotel Logo" />
        </div>

        <nav className="nav-container">
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Rooms</a></li>
            <li><a href="#">Facilities</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>

          <div className="auth-buttons">
            <button className="auth-btn">Sign In</button>
            <button className="auth-btn register-btn">Register</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;