import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../media/Logo2-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/30'); 
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        if (user.photoURL) {
          setProfilePic(user.photoURL); 
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.photoURL) {
            setProfilePic(userData.photoURL); 
          }
        }
      } else {
        setIsLoggedIn(false);
        setProfilePic('https://via.placeholder.com/30'); 
      }
    });

    return () => unsubscribe(); 
  }, [auth]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/user/profile');
    } else {
      navigate('/login', { state: { from: '/user/profile' } });
    }
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

          {isLoggedIn ? null : (
            <div className="auth-buttons">
              <button className="auth-btn" onClick={handleSignInClick}>Sign In</button>
              <button className="auth-btn register-btn" onClick={handleRegisterClick}>Register</button>
            </div>
          )}
        </nav>

        <div className="hamburger-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />} 
        </div>

        {isLoggedIn && (
          <div className="profile-icon" onClick={handleProfileClick} style={{ cursor: 'pointer', marginLeft: '20px' }}>
            <img 
              src={profilePic} 
              alt="Profile" 
              style={{ width: '30px', height: '30px', borderRadius: '50%' }} 
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
