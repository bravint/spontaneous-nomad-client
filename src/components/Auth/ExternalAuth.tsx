import React from 'react';

import apple from '../../assets/auth/apple-sml.svg';
import facebook from '../../assets/auth/facebook-sml.svg';
import google from '../../assets/auth/google-sml.svg';

import '../../styles/external-auth.css';

export const ExternalAuth = () => {
    const handleGoogleLogin = () => window.open('http://localhost:4000/auth/google', '_self');

    const handleFacebookLogin = () => window.open('#', '_self');

    const handleAppleLogin = () => window.open('#', '_self');

    return (
        <div className="external-auth-container">
            <div
                className="external-auth-provider auth-provider-google"
                onClick={handleGoogleLogin}
            >
                <img
                    className="external-auth-logo"
                    src={google}
                    alt="Google Logo"
                />
                <p className="external-auth-text">Sign in With Google</p>
            </div>
            <div
                className="external-auth-provider auth-provider-facebook"
                onClick={handleFacebookLogin}
            >
                <img
                    className="external-auth-logo"
                    src={facebook}
                    alt="Facebook Logo"
                />
                <p className="external-auth-text">Sign in With Facebook</p>
            </div>
            <div
                className="external-auth-provider auth-provider-apple"
                onClick={handleAppleLogin}
            >
                <img
                    className="external-auth-logo"
                    src={apple}
                    alt="Apple Logo"
                />
                <p className="external-auth-text">Sign in With Apple</p>
            </div>
        </div>
    );
};
