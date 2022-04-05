import React, { useState } from 'react';

import { Header } from './Header';
import { GoogleMaps } from './map/GoogleMaps';
import { ViewLocation } from './map/ViewLocation';

import '../styles/map.css';

export const Map = () => {
    const [newLocation, setNewLocation] = useState(null);

    return (
        <>
            <Header />
            <section className="map">
                <GoogleMaps
                    newLocation={newLocation}
                    setNewLocation={setNewLocation}
                />
                <div>
                    <ViewLocation />
                </div>
            </section>
        </>
    );
};
