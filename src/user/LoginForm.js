import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Styles/RegistrationForm.css'; 

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/user/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="title">Login</p>
            <p className="message">Access your account.</p>
            {error && <p className="error">{error}</p>}
            <label>
                <input 
                    required 
                    placeholder="Enter your email" 
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
                    placeholder="Enter your password" 
                    type="password" 
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span>Password</span>
            </label>
            <button type="submit" className="submit">Login</button>
            <p className="signin">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    );
};

export default LoginForm;

