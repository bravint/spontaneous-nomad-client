import { Header } from './Header';

import '../styles/home.css';

export const Home = () => {
    return (
        <section className="home">
            <div className="home-hero">
                <Header />
                <h1 className="home-hero-text">
                    Share
                    <br />
                    your favourite <br />
                    destinations
                </h1>
            </div>
        </section>
    );
};
