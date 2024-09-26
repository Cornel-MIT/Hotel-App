import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
         <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
         </div>
      <div className="footer-container">
        <div className="footer-section contact-info">
           <h4>Contact</h4>
           <p>011 856 0652</p>
           <p>921 686 9501</p>
           <p>eldiablo@gmail.com</p>
           <p>www.eldiablo.com</p>
        </div>

        <div className="footer-section explore">
          <h4>Explore</h4>
          <ul>
            <li>Design</li>
            <li>Prototyping</li>
            <li>Development features</li>
            <li>Diagramming</li>
          </ul>
        </div>

        <div className="footer-section resources">
          <h4>Resources</h4>
          <ul>
            <li>Best practices</li>
            <li>Color wheel</li>
            <li>Guest app</li>
            <li>Developers</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
