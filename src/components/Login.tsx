import React, { useState } from 'react';

import { ExternalAuth } from './Auth/ExternalAuth';

import '../styles/signin.css';

export const Login = () => {
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
                credentials: 'include',
            },
            body: JSON.stringify(form),
        });

        const result = await response.json();

        console.log('result', result);
    };

    return (
        <section className="signin">
            <div className="signin-hero">&nbsp;</div>
            <div className="signin-auth-section">
                <div className="signin-auth">
                    <h1 className="signin-auth-title">Sign In</h1>
                    <div className="signin-auth-options-container">
                        <form
                            className="signin-auth-form"
                            onSubmit={handleSubmit}
                        >
                            <input
                                className="signin-auth-input"
                                id="username"
                                type="text"
                                placeholder="Enter your Username"
                                value={form.username}
                                onChange={handleChange}
                            />
                            <input
                                className="signin-auth-input"
                                id="password"
                                type="password"
                                placeholder="Enter your Password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <button className="signin-auth-form-button">
                                Sign In
                            </button>
                        </form>
                        <div className="signin-external-auth-title-container">
                            <div className="signin-external-auth-title-links">
                                <h4 className="signin-external-auth-title">
                                    Or
                                </h4>
                            </div>
                        </div>
                        <ExternalAuth />
                        <div className="auth-redirect">
                            <h3>Need an account?</h3>
                            <button className="signin-auth-form-button auth-redirect-button">
                                Sign up here
                            </button>
                        </div>
                    </div>
                </div>
                <p className="signin-redirect-home">Return to Home Page</p>
            </div>
        </section>
    );
};
