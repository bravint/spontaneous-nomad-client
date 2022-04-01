import React from 'react';
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
                <Link to="/login">
                    <li className="header-auth-button">Login</li>
                </Link>
                <Link to="/register">
                    <li className="header-auth-button">Register</li>
                </Link>
            </ul>
        </header>
    );
};
