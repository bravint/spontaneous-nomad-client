import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { OAuthLogin } from './oauth/OAuthLogin';
import { AuthDivider } from './auth/AuthDivider';

import { StoreContext } from '../utils/store';
import { HTTP_METHOD, LOCAL_PATH, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS} from '../utils/config';

import '../styles/auth.css';

export const Login = () => {
    const { dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialForm = {
        email: '',
        password: '',
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event: any) => {
        const { name, value } = event;

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch(SERVER_URL.AUTH_LOGIN, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const result = await response.json();

        localStorage.setItem(LOCAL_STORAGE.JWT, result.token);

        handleDispatch(STORE_ACTIONS.USER, result.data);

        navigate(LOCAL_PATH.DASHBOARD);
    };

    return (
        <section className="auth">
            <div className="auth-hero-container">&nbsp;</div>
            <div className="auth-options-section">
                <p className="auth-options-title">
                    Welcome <br /> Back
                </p>
                <div className="auth-options-container">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            className="auth-input"
                            name="email"
                            type="text"
                            placeholder="Enter your Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="auth-input"
                            name="password"
                            type="password"
                            placeholder="Enter your Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button className="auth-form-button">Sign In</button>
                    </form>
                    <AuthDivider />
                    <OAuthLogin />
                    <div className="auth-redirect">
                        <h3>Need an account?</h3>
                        <Link to="/register">
                            <button className="auth-form-button auth-redirect-button">
                                Create an Account Here
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
