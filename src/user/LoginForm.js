import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Styles/RegistrationForm.css';  

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            const from = location.state?.from || '/user';
            navigate(from);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No user found with this email. Please check your email or register.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="title">Login</p>
            <p className="message">Welcome back! Please login to your account.</p>
            {error && <p className="error">{error}</p>}
            <label>
                <input 
                    required 
                    placeholder="Email" 
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
                    placeholder="Password" 
                    type="password" 
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span>Password</span>
            </label>
            <button type="submit" className="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="signin">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p className="signin">
                <Link to="/forgot-password">Forgot Password?</Link>
            </p>
        </form>
    );
};

export default LoginForm;