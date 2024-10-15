import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/RegistrationForm.css'; 

const LoginForm = () => {
    return (
        <form className="form">
            <p className="title">Login</p>
            <p className="message">Access your account.</p>
            <label>
                <input required placeholder="" type="email" className="input" />
                <span>Email</span>
            </label>
            <label>
                <input required placeholder="" type="password" className="input" />
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
