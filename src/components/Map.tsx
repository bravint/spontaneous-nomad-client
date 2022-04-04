import React, { useState } from 'react';

import { Header } from './Header';
import { GoogleMaps } from './map/GoogleMaps';
import { ViewLocation } from './map/ViewLocation';
import { CreateLocation } from './map/CreateLocation';

import '../styles/map.css';

export const Map = () => {
    const [showSideBar, setShowSideBar] = useState(true);

    return (
        <>
            <Header />
            <section className="map">
                <GoogleMaps />
                <ViewLocation />
            </section>
        </>
    );
};
