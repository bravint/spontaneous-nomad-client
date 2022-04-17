import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SidebarFooter } from './footer/SidebarFooter';

import { StoreContext } from '../utils/store';
import { LOCAL_PATH, LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

import '../styles/home.css';

export const Home = () => {
    const { state, dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const { user } = state;

    const handleDispatch = (type: string, payload: null): void => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.JWT);

        handleDispatch(STORE_ACTIONS.USER, null);

        navigate(LOCAL_PATH.HOME);
    };

    return (
        <>
            <section className="home">
                <div className="home-hero">
                    <div className="home-hero-text-container">
                        <h1 className="home-hero-text">
                            Share
                            <br />
                            your favourite
                            <br />
                            destinations
                        </h1>
                    </div>
                </div>
                <section className="home-sidebar">
                    <div>&nbsp;</div>
                    <div className="home-sidebar-action">
                        <div className="home-sidebar-text">
                            <p>Log your trips</p>
                            <p>Rate your favourite places</p>
                            <p>Share with your friends</p>
                        </div>
                        {!user && (
                            <div className="home-sidebar-conditional-section">
                                <p className="home-sidebar-conditional-section-title">
                                    Start here!
                                </p>
                                <div className="home-auth-link">
                                    <Link to="/login">
                                        <button className="home-sidebar-button  auth-button-login">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/register">
                                        <button className="home-sidebar-button  auth-button-register">
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                        {user && (
                            <div className="home-sidebar-conditional-section">
                                <p className="home-sidebar-conditional-section-title">
                                    Hi {user.username}!
                                </p>
                                <div className="home-auth-link">
                                    <Link to="/dashboard">
                                        <button className="home-sidebar-button">
                                            Dashboard
                                        </button>
                                    </Link>
                                    <button
                                        className="home-sidebar-button auth-button-logout"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <section className="sidebar-footer">
                        <SidebarFooter />
                    </section>
                </section>
            </section>
        </>
    );
};
