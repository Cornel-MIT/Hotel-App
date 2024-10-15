import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';  
import './Styles/RegistrationForm.css';

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const storage = getStorage();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

 
            const imageRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(imageRef, profilePicture);
            const photoURL = await getDownloadURL(imageRef);

            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email,
                photoURL
            });

            navigate('/user/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="title">Register</p>
            <p className="message">Signup now and get full access to our app.</p>
            {error && <p className="error">{error}</p>}
            <div className="flex">
                <label>
                    <input 
                        required 
                        type="text" 
                        className="input" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span>Firstname</span>
                </label>
                <label>
                    <input 
                        required 
                        type="text" 
                        className="input" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <span>Lastname</span>
                </label>
            </div>
            <label>
                <input 
                    required 
                    type="email" 
                    className="input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span>Email</span>
            </label>
            <label>
                <input 
                    required 
                    type="password" 
                    className="input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span>Password</span>
            </label>
            <label>
                <input 
                    required 
                    type="password" 
                    className="input" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span>Confirm password</span>
            </label>
            <label>
                <input 
                    type="file" 
                    className="input" 
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <span>Profile Picture</span>
            </label>
            <button type="submit" className="submit">Submit</button>
            <p className="signin">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </form>
    );
};

export default RegistrationForm;

