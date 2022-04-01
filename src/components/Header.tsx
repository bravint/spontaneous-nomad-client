import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/header.css';

export const Header = () => {
    return (
        <header>
            <div className="header-title">Spontanous Nomad</div>
            <ul className="header-site-link">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <ul className="header-auth-link">
                <li className="header-auth-button">
                    <Link to="/login">Login</Link>
                </li>
                <li className="header-auth-button">
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </header>
    );
};
