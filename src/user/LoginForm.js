import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import './Styles/RegistrationForm.css';  

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                await sendEmailVerification(user);
                setVerificationSent(true);
                setLoading(false);
                return;
            }

            const from = location.state?.from || '/user';
            navigate(from);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No user found with this email. Please check your email or register.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else {
                setError('An error occurred or email is not yet varified. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (verificationSent) {
        return (
            <div className="verification-message">
                <h2>Email Verification Required</h2>
                <p>A verification email has been sent to {email}. Please check your inbox and click on the verification link to complete your login.</p>
                <p>Once verified, please try logging in again.</p>
                <button onClick={() => setVerificationSent(false)}>Back to Login</button>
            </div>
        );
    }

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