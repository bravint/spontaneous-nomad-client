import { Header } from './Header';

import { Map} from './map/Map';

export const Dashboard = () => {
    return (
        <>
            <Header />
            <Map />
            <section className="dashboard">
                <h1>Dashboard</h1>
            </section>
        </>
    );
};
