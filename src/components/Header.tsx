import React, { useState } from 'react';

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
                <li className="header-auth-button">Login</li>
                <li className="header-auth-button">Register</li>
            </ul>
        </header>
    );
};
