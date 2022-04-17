import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { OAuthDivider } from './oauth/OAuthDivider';
import { OAuthLogin } from './oauth/OAuthLogin';
import { SidebarFooter } from './SidebarFooter';

import { HTTP_METHOD, LOCAL_PATH, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../utils/config';
import { IUser } from '../utils/model';
import { StoreContext } from '../utils/store';

import '../styles/auth.css';

export const Register = () => {
    const { dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleDispatch = (type: string, payload: IUser) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialForm = {
        email: '',
        password: '',
        passwordCheck: '',
        username: '',
        profileImage: '',
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event: any) => setForm({ ...form, [event.target.name]: event.target.value });

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch(SERVER_URL.AUTH_REGISTER, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const result = await response.json();

        if (result.data) {
            localStorage.setItem(LOCAL_STORAGE.JWT, result.token);

            handleDispatch(STORE_ACTIONS.USER, result.data);
    
            navigate(LOCAL_PATH.DASHBOARD);
        }
    };

    return (
        <section className="auth">
            <div className="auth-hero-container">&nbsp;</div>
            <div className="auth-options-section">
                <p className="auth-options-title">
                    Create
                    <br />
                    Account
                </p>
                <div className="auth-options-container">
                    <form className="auth-form" onSubmit={handleSubmit}>
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
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="auth-input"
                            name="passwordCheck"
                            type="password"
                            placeholder="Re-enter your password"
                            value={form.passwordCheck}
                            onChange={handleChange}
                            required
                        />
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
                            placeholder="Link to Profile Image (optional)"
                            value={form.profileImage}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="auth-form-button"
                            onSubmit={handleSubmit}
                        >
                            Create Account
                        </button>
                    </form>
                    <OAuthDivider />
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
