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

    const capitaliseFirstLetter = (string: string) =>
        string.replace(/\b\w/g, (c: string) => c.toUpperCase());

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.JWT);

        handleDispatch(STORE_ACTIONS.USER, null);

        navigate(LOCAL_PATH.ROOT);
    };

    return (
        <header>
            <div className="header-title">Spontanous Nomad</div>
            <ul className="header-site-link">
                <li>About</li>
                <li>Contact</li>

                {user && (
                    <>
                                            <Link to={LOCAL_PATH.ROOT} className="router-link">
                            <li className="header-link">My Home</li>
                        </Link>
                        <Link to={LOCAL_PATH.DASHBOARD} className="router-link">
                            <li className="header-link">My Trips</li>
                        </Link>
                        <Link to={LOCAL_PATH.MAP} className="router-link">
                            <li className="header-link">Map</li>
                        </Link>

                        <li>Hi, {capitaliseFirstLetter(user.username)}</li>
                        <li
                            className="auth-button auth-button-login"
                            onClick={handleLogout}
                        >
                            Logout
                        </li>
                    </>
                )}
            </ul>
            {!user && (
                <ul className="header-auth-link">
                    <Link to="/login">
                        <li className="auth-button auth-button-login">Login</li>
                    </Link>
                </ul>
            )}
        </header>
    );
};
