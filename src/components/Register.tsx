import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { OAuthLogin } from './oauth/OAuthLogin';

import '../styles/auth.css';

export const Register = () => {
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

        console.log('register', result) //setuser
    };

    return (
        <section className="signin">
            <div className="signin-hero">&nbsp;</div>
            <div className="signin-auth-section">
                <div className="signin-auth">
                    <h1 className="signin-auth-title">Create Account</h1>
                    <div className="signin-auth-options-container">
                        <form
                            className="signin-auth-form"
                            onSubmit={handleSubmit}
                        >
                            <input
                                className="signin-auth-input"
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
                                className="signin-auth-input"
                                id="password"
                                type="password"
                                placeholder="Enter a password"
                                value={form.password}
                                required
                                onChange={handleChange}
                            />
                            <input
                                className="signin-auth-input"
                                id="passwordCheck"
                                type="password"
                                placeholder="Re-enter your password"
                                value={form.passwordCheck}
                                required
                                onChange={handleChange}
                            />
                            <input
                                className="signin-auth-input"
                                id="email"
                                type="text"
                                placeholder="Enter your email address"
                                value={form.email}
                                required
                                onChange={handleChange}
                            />
                            <button className="signin-auth-form-button">
                                Sign Up
                            </button>
                        </form>
                        <div className="signin-external-auth-title-container">
                            <div className="signin-external-auth-title-links">
                                <h4 className="signin-external-auth-title">
                                    Or
                                </h4>
                            </div>
                        </div>
                        <OAuthLogin />
                        <div className="auth-redirect">
                            <h3>Already have an account?</h3>
                            <Link to="/login">
                            <button className="signin-auth-form-button auth-redirect-button">
                                Sign In
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Link to="/"><p className="auth-redirect-home">Return to Home Page</p></Link>
            </div>
        </section>
    );
};
