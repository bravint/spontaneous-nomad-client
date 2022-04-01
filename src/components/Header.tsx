import React, { useState } from 'react';

import '../styles/header.css';

export const Header = () => {
    return (
        <header>
            <div className="header-title">Spontanous Nomad</div>
            <ul className="header-site-links">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <ul className="header-auth-links">
                <li>Login</li>
                <li>Register</li>
            </ul>
        </header>
    );
};
