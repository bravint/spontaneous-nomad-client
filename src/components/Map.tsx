import React, { useState } from 'react';

import { Header } from './Header';
import { GoogleMapsContainer } from './map/GoogleMapsContainer';
import { ViewLocation } from './map/ViewLocation';

import '../styles/map.css';

export const Map = () => {
    const [showSideBar, setShowSideBar] = useState(true);

    return (
        <>
            <Header />
            <section className="map">
                <GoogleMapsContainer />
                <ViewLocation />
            </section>
        </>
    );
};
