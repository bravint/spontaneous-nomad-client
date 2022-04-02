import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { OAuthLogin } from './oauth/OAuthLogin';
import { AuthDivider } from './oauth/AuthDivider';

import { StoreContext } from '../utils/store';

import '../styles/auth.css';

export const Register = () => {
    const { dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleDispatch = (type: any, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialForm = {
        username: '',
        password: '',
        passwordCheck: '',
        email: '',
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event: any) =>
        setForm({ ...form, [event.target.id]: event.target.value });

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:4000/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const result = await response.json();

        localStorage.setItem('token', result.token);

        handleDispatch('user', result.data);

        navigate('/dashboard');
    };

    return (
        <section className="signin">
            <div className="signin-hero">&nbsp;</div>
            <div className="signin-auth-section">
                <p className="auth-title">
                    Register
                </p>
                <div className="auth-options-container">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            className="auth-input"
                            id="username"
                            type="text"
                            placeholder="Enter a username"
                            value={form.username}
                            minLength={3}
                            maxLength={30}
                            required
                            onChange={handleChange}
                        />
                        <input
                            className="auth-input"
                            id="password"
                            type="password"
                            placeholder="Enter a password"
                            value={form.password}
                            required
                            onChange={handleChange}
                        />
                        <input
                            className="auth-input"
                            id="passwordCheck"
                            type="password"
                            placeholder="Re-enter your password"
                            value={form.passwordCheck}
                            required
                            onChange={handleChange}
                        />
                        <input
                            className="auth-input"
                            id="email"
                            type="text"
                            placeholder="Enter your email address"
                            value={form.email}
                            required
                            onChange={handleChange}
                        />
                        <button className="auth-form-button">
                            Sign Up
                        </button>
                    </form>
                    <AuthDivider />
                    <OAuthLogin />
                    <div className="auth-redirect">
                        <h3>Already have an account?</h3>
                        <Link to="/login">
                            <button className="auth-form-button auth-redirect-button">
                                Login here
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="auth-redirect-home-container">
                    <Link to="/">
                        <p className="auth-redirect-home">
                            Return to Home Page
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
};
