import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProfile, updateProfilePicture, saveProfileChanges } from '../redux/slices/profileSlice';
import { useNavigate } from 'react-router-dom'; 
import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const {
        fullName = '',
        email = '',
        profilePicture = '',
        phoneNumber = '',
        city = '',
        state = '',
        zipCode = '',
        country = '',
        status,
        error,
    } = useSelector((state) => state.profile || {});

    const [editMode, setEditMode] = useState(false);
    const [profilePic, setProfilePic] = useState(profilePicture);
    const [localFullName, setLocalFullName] = useState(fullName);
    const [localEmail, setLocalEmail] = useState(email);
    const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
    const [localCity, setLocalCity] = useState(city);
    const [localState, setLocalState] = useState(state);
    const [localZipCode, setLocalZipCode] = useState(zipCode);
    const [localCountry, setLocalCountry] = useState(country);

    useEffect(() => {
        dispatch(fetchAdminProfile()).then((result) => {
            console.log('Fetched profile:', result);
        });
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const handleSaveChanges = () => {
        dispatch(saveProfileChanges({
            fullName: localFullName,
            email: localEmail,
            phoneNumber: localPhoneNumber,
            city: localCity,
            state: localState,
            zipCode: localZipCode,
            country: localCountry,
        }));
        setEditMode(false);
    };

    const handleEditProfilePicture = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);

            dispatch(updateProfilePicture(file));
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="profile-page">
            <h2>Edit Profile</h2>
            <div className="profile-container">
                <div className="profile-picture-section">
                    <img src={profilePic || 'default-profile-pic-url.jpg'} alt="Profile" className="profile-picture" />
                    <label className="edit-picture-btn">
                        Edit
                        <input type="file" style={{ display: 'none' }} onChange={handleEditProfilePicture} />
                    </label>
                </div>
                <div className="profile-form">
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        value={localFullName} 
                        onChange={(e) => setLocalFullName(e.target.value)} 
                        disabled={!editMode} 
                    />

                    <label>Email</label>
                    <input 
                        type="email" 
                        value={localEmail} 
                        onChange={(e) => setLocalEmail(e.target.value)} 
                        disabled={!editMode} 
                    />

                    <label>Number</label>
                    <input 
                        type="text" 
                        value={localPhoneNumber} 
                        onChange={(e) => setLocalPhoneNumber(e.target.value)} 
                        disabled={!editMode} 
                    />

                    <label>City</label>
                    <input 
                        type="text" 
                        value={localCity} 
                        onChange={(e) => setLocalCity(e.target.value)} 
                        disabled={!editMode} 
                    />

                    <label>State</label>
                    <input 
                        type="text" 
                        value={localState} 
                        onChange={(e) => setLocalState(e.target.value)} 
                        disabled={!editMode} 
                    />

                    <label>Zip Code</label>
                    <input 
                        type="text" 
                        value={localZipCode} 
                        onChange={(e) => setLocalZipCode(e.target.value)} 
                        disabled={!editMode} 
                    />

                    <label>Country</label>
                    <input 
                        type="text" 
                        value={localCountry} 
                        onChange={(e) => setLocalCountry(e.target.value)} 
                        disabled={!editMode} 
                    />

                    <div className="form-actions">
                        <button onClick={() => setEditMode(true)}>Edit</button>
                        <button onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            </div>
            <button className="back-btn" onClick={handleBackToHome}>Back To Home</button>
        </div>
    );
};

export default Profile;
