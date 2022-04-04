import React, { useContext, useEffect, useState } from 'react';

import { Header } from './Header';
import { GoogleMaps } from './map/GoogleMaps';
import { ViewLocation } from './map/ViewLocation';
import { CreateLocation } from './map/CreateLocation';

import { StoreContext } from '../utils/store';

import '../styles/map.css';

export const Map = () => {
    const { dispatch } = useContext(StoreContext);

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
                    {newLocation && (
                        <CreateLocation
                            newLocation={newLocation}
                            setNewLocation={setNewLocation}
                        />
                    )}
                    <ViewLocation />
                </div>
            </section>
        </>
    );
};
