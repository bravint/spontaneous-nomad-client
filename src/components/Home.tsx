import { Link } from 'react-router-dom';

import { Header } from './Header';

import '../styles/home.css';

export const Home = () => {
    return (
        <>
            <section className="home">
                <Header />
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
                <div className="home-call-action">
                    <p className="home-call-action-text">
                        Track and share your experiences today!
                    </p>
                    <div className="home-call-action-auth">
                        <Link to="/login">
                            <p className="home-auth-button">Login</p>
                        </Link>
                        <Link to="/register">
                            <p className="home-auth-button">Register</p>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};
