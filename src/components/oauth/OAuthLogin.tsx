import React from 'react';

import facebook from '../../assets/auth/facebook-sml.svg';
import google from '../../assets/auth/google-sml.svg';

import '../../styles/oauth-login.css';

export const OAuthLogin = () => {
    const handleGoogleLogin = () =>
        window.open('http://localhost:4000/auth/google', '_self');

    const handleFacebookLogin = () => window.open('#', '_self');

    return (
        <div className="oauth-container">
            <div
                className="oauth-provider oauth-provider-google"
                onClick={handleGoogleLogin}
            >
                <img 
                    className="oauth-logo" 
                    src={google} 
                    alt="Google Logo" 
                />
                <p className="oauth-text">
                    Sign in With Google
                </p>
            </div>
            <div
                className="oauth-provider oauth-provider-facebook"
                onClick={handleFacebookLogin}
            >
                <img
                    className="external-auth-logo"
                    src={facebook}
                    alt="Facebook Logo"
                />
                <p className="oauth-text">
                    Sign in With Facebook
                </p>
            </div>
        </div>
    );
};
