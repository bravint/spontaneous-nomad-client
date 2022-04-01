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
                            your favourite <br />
                            destinations
                        </h1>
                    </div>
                </div>
                <div className="home-call-action">
                    <p>Track and Share your experiences today!</p>
                    <div className="home-call-action-auth">
                        <p className="home-auth-button">Login</p>
                        <p className="home-auth-button">Register</p>
                    </div>
                </div>
            </section>
        </>
    );
};
