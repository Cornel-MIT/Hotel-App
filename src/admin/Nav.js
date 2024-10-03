import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import './styles.css'

const Nav = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate(); 
    const handleLogout = async () => {
        try {
            await logout(); 
            navigate('/authform');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="navcontainer">
            <nav className="nav">
                <div>
                    <Link to="/" className="nav-option option1">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                            className="nav-img"
                            alt="dashboard"
                        />
                        <h3>Home</h3>
                    </Link>

                    <Link to="/admin/bookings" className="nav-option option2">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                            className="nav-img"
                            alt="articles"
                        />
                        <h3>Bookings</h3>
                    </Link>

                    <Link to="/admin/add-rooms" className="nav-option option3">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                            className="nav-img"
                            alt="report"
                        />
                        <h3>Add Rooms</h3>
                    </Link>

                    <Link to="/admin/hotels" className="nav-option option4">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                            className="nav-img"
                            alt="rooms"
                        />
                        <h3>Hotel</h3>
                    </Link>

                    <Link to="/admin/profile" className="nav-option option5">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                            className="nav-img"
                            alt="blog"
                        />
                        <h3>Profile</h3>
                    </Link>

                    <Link to="/admin/settings" className="nav-option option6">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                            className="nav-img"
                            alt="settings"
                        />
                        <h3>Settings</h3>
                    </Link>

                    <div className="nav-option logout" onClick={handleLogout}>
                      <img
                         src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                         className="nav-img"
                         alt="logout"
                       />
                       <h3>Logout</h3>
                   </div>

                </div>
            </nav>
        </div>
    );
};

export default Nav;
