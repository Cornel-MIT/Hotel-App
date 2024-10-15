import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';  
import './Styles/Profile.css'; 

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchUserData();
    }, [user]);

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-info">
                <img
                    src={userData.photoURL || "https://via.placeholder.com/150"} 
                    alt="Profile"
                    className="profile-image"
                />
                <div className="profile-details">
                    <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> User</p> 
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
