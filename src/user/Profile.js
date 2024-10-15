import React from 'react';
import './Styles/Profile.css'; 

const Profile = () => {
    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-info">
                <img
                    src="https://via.placeholder.com/150" 
                    alt="Profile"
                    className="profile-image"
                />
                <div className="profile-details">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Email:</strong> john.doe@example.com</p>
                    <p><strong>Role:</strong> User</p>
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
