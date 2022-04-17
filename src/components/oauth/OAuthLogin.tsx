import google from '../../assets/auth/google-sml.svg';

import '../../styles/oauth-login.css';

import { SERVER_URL } from '../../utils/config';

export const OAuthLogin = () => {
    const handleGoogleLogin = () => window.open(SERVER_URL.OAUTH_GOOGLE, '_self');

    return (
        <div
            className="oauth-provider oauth-provider-google"
            onClick={handleGoogleLogin}
        >
            <img className="oauth-logo" src={google} alt="Google Logo" />
            <p className="oauth-text">Sign in With Google</p>
        </div>
    );
};
