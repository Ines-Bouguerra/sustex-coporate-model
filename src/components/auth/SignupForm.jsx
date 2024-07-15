import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailIcon from '../../assets/icons/email-icon.svg';
import hidePasswordIcon from '../../assets/icons/hide-password-icon.svg';
import showPasswordIcon from '../../assets/icons/show-password-icon.svg';
import { signup } from '../../services/auth';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            console.error('Email and password are required');
            return;
        }
        try {
            const userData = await signup(email, password, userName);
            if (userData) {
                toast.success('Account created successfully!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h3 className="form-title">Sign up</h3>
                    <p className="form-subtitle">
                        Already have an account? <Link to="/auth/signin" className="form-link">Sign in here</Link>
                    </p>
                </div>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <div className="input-wrapper">
                        <input
                            name="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Enter username"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="input-wrapper">
                        <input
                            name="email"
                            type="email"
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
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
