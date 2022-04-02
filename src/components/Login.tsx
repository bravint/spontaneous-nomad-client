import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { OAuthLogin } from './oauth/OAuthLogin';
import { AuthDivider } from './oauth/AuthDivider';

import { StoreContext } from '../utils/store';

import '../styles/auth.css';

export const Login = () => {
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
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event: any) =>
        setForm({ ...form, [event.target.id]: event.target.value });

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:4000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const result = await response.json();

        localStorage.setItem('token', result.token);

        handleDispatch('user', result.data);

        navigate('/dashboard')
    };

    return (
        <section className="signin">
            <div className="signin-hero">&nbsp;</div>
            <div className="signin-auth-section">
                <p className="auth-title">
                    Welcome <br /> Back
                </p>
                <div className="auth-options-container">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            className="auth-input"
                            id="username"
                            type="text"
                            placeholder="Enter your Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="auth-input"
                            id="password"
                            type="password"
                            placeholder="Enter your Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button className="auth-form-button">Sign In</button>
                    </form>
                    <AuthDivider />
                    <OAuthLogin />
                    <div className="auth-redirect">
                        <h3>Need an account?</h3>
                        <Link to="/register">
                            <button className="auth-form-button auth-redirect-button">
                                Create an Account Here
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="auth-redirect-home-container">
                <Link to="/">
                    <p className="auth-redirect-home">Return to Home Page</p>
                </Link>
                </div>
            </div>
        </section>
    );
};
