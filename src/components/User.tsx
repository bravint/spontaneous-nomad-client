import { Link } from 'react-router-dom';

import { AuthDivider } from './auth/AuthDivider';
import { OAuthLogin } from './oauth/OAuthLogin';
import { SidebarFooter } from './SidebarFooter';

import '../styles/auth.css';

export const User = (props: any) => {
    const { form, handleChange, nextStep } = props;

    const handleStepChange = (event: any) => {
        event.preventDefault();

        nextStep();
    };

    return (
        <section className="auth">
            <div className="auth-hero-container">&nbsp;</div>
            <div className="auth-options-section">
                <p className="auth-options-title">
                    Create
                    <br /> Account
                </p>
                <div className="auth-options-container">
                    <form className="auth-form">
                        <input
                            className="auth-input"
                            name="email"
                            type="text"
                            placeholder="Enter your email address"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="auth-input"
                            name="password"
                            type="password"
                            placeholder="Enter a password"
                            value={form.password}
                            required
                            onChange={handleChange}
                        />
                        <input
                            className="auth-input"
                            name="passwordCheck"
                            type="password"
                            placeholder="Re-enter your password"
                            value={form.passwordCheck}
                            required
                            onChange={handleChange}
                        />
                        <button
                            className="auth-form-button"
                            onClick={handleStepChange}
                        >
                            Next
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
                    <section className="sidebar-footer">
                        <SidebarFooter />
                    </section>
                </div>
            </div>
        </section>
    );
};
