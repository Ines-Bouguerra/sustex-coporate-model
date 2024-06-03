import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../../assets/icons/google-icon.svg';
import appleIcon from '../../assets/icons/apple-icon.svg';
import facebookIcon from '../../assets/icons/facebook-icon.svg';
import emailIcon from '../../assets/icons/email-icon.svg';
import hidePasswordIcon from '../../assets/icons/hide-password-icon.svg';
import showPasswordIcon from '../../assets/icons/show-password-icon.svg';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h3 className="form-title">Sign in</h3>
                    <p className="form-subtitle">
                        Don't have an account? <Link to="/auth/signup" className="form-link">Register here</Link>
                    </p>
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="input-wrapper">
                        <input
                            name="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Enter email"
                        />
                        <img src={emailIcon} alt="Email Icon" className="input-icon" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-wrapper">
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="password-toggle"
                        >
                            <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt={showPassword ? "Hide Password Icon" : "Show Password Icon"} />
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Sign in
                    </button>
                </div>
                <p className="alternative-text">or continue with</p>
                <div className="icon-buttons">
                    <button type="button" className="icon-button">
                        <img src={googleIcon} alt="Google Icon" />
                    </button>
                    <button type="button" className="icon-button">
                        <img src={appleIcon} alt="Apple Icon" />
                    </button>
                    <button type="button" className="icon-button">
                        <img src={facebookIcon} alt="Facebook Icon" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
