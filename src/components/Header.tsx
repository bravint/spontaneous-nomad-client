import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StoreContext } from '../utils/store';
import { LOCAL_PATH, LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

import '../styles/header.css';

export const Header = () => {
    const { state, dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const { user } = state;

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const capitaliseFirstLetter = (string: any) =>
        string.replace(/\b\w/g, (c: string) => c.toUpperCase());

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.JWT);

        handleDispatch(STORE_ACTIONS.USER, null);

        navigate(LOCAL_PATH.HOME);
    };

    return (
        <header>
            <div className="header-title">Spontanous Nomad</div>
            <ul className="header-site-link">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            {user && (
                <>
                    <Link to={LOCAL_PATH.DASHBOARD} className="router-link">
                        <h2 className="header-link">My Trips</h2>
                    </Link>
                    <div className="header-profile">
                        <h2>Hi, {capitaliseFirstLetter(user.username)}</h2>
                        <button
                            className="header-auth-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}
            {!user && (
                <ul className="header-auth-link">
                    <Link to="/login">
                        <li className="header-auth-button">Login</li>
                    </Link>
                    <Link to="/register">
                        <li className="header-auth-button">Register</li>
                    </Link>
                </ul>
            )}
        </header>
    );
};
