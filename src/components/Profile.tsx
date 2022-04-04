import { Link } from 'react-router-dom';

import { OAuthLogin } from './oauth/OAuthLogin';
import { AuthDivider } from './auth/AuthDivider';

import '../styles/auth.css';

export const Profile = (props: any) => {
    const { form, handleChange, previousStep, handleSubmit } = props;

    const handleStepChange = (event: any) => {
        event.preventDefault();

        previousStep();
    };

    return (
        <section className="auth">
            <div className="auth-hero-container">&nbsp;</div>
            <div className="auth-options-section">
                <p className="auth-options-title">
                    Create
                    <br /> Profile
                </p>
                <div className="auth-options-container">
                    <form className="auth-form">
                        <input
                            className="auth-input"
                            name="username"
                            type="text"
                            placeholder="Enter your email address"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="auth-input"
                            name="profileImage"
                            type="text"
                            placeholder="Link to Profile Image"
                            value={form.profileImage}
                            onChange={handleChange}
                        />
                        <button
                            className="auth-form-button"
                            onClick={handleSubmit}
                        >
                            Create Account
                        </button>
                        <br />
                        <button
                            className="auth-form-button"
                            onClick={handleStepChange}
                        >
                            Go Back
                        </button>
                    </form>
                    <AuthDivider />
                    <OAuthLogin />
                    <div className="auth-redirect">
                        <h3>Already have an account?</h3>
                        <Link to="/login">
                            <button className="auth-form-button auth-redirect-button">
                                Login here
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="auth-redirect-home-container">
                    <Link to="/">
                        <p className="auth-redirect-home">
                            Return to Home Page
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
};
