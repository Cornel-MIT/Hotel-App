import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth'; 
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
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const { register } = useAuth(); 
    const storage = getStorage();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
            setLoading(false);
            return;
        }

        try {
            const user = await register(email, password, firstName, lastName); // Pass additional params

            if (profilePicture) {
                const imageRef = ref(storage, `profilePictures/${user.uid}`);
                await uploadBytes(imageRef, profilePicture);
                const photoURL = await getDownloadURL(imageRef);

                await setDoc(doc(db, 'users', user.uid), {
                    firstName,
                    lastName,
                    email,
                    photoURL
                }, { merge: true });
            }

            const from = location.state?.from || '/user/profile';
            navigate(from);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else {
                setError('An error occurred during registration. Please try again.');
            }
        } finally {
            setLoading(false);
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
            <button type="submit" className="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Submit'}
            </button>
            <p className="signin">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </form>
    );
};

export default RegistrationForm;
