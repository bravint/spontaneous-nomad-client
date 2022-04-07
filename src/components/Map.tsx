import { GoogleMaps } from './map/GoogleMaps';
import { ViewLocations } from './map/ViewLocations';

import '../styles/map.css';

export const Map = () => {
    return (
        <section className="map">
            <GoogleMaps />
            <ViewLocations />
        </section>
    );
};
