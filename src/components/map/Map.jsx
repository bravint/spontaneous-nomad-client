import React, { useEffect, useState, useContext } from 'react';
import {
    GoogleMap,
    LoadScript,
    InfoWindow,
    Marker,
} from '@react-google-maps/api';

import { StoreContext } from '../../utils/store';

import { GOOGLE_MAPS_API_KEY } from '../../utils/config';

export const Map = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { user } = state;

    const initialMapCenterLocation = { lat: 0, lng: 0 };

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [center, setCenter] = useState(initialMapCenterLocation);

    const handleMarkerClick = (location) => setSelectedLocation(location);

    function handleMapClick(event) {
        setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        const newLocation = {
            name: 'newLocation',
            id: locations.length + 1,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setLocations([...locations, newLocation]);
    }

    const handleLocationSubmit = () => {};

    const containerStyle = {
        width: '100vw',
        height: '100vh',
    };

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                onClick={handleMapClick}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={3}
                options={{fullscreenControl: false, streetViewControl: false}}
            >
                {locations.map((location) => {
                    return (
                        <Marker
                            key={location.id}
                            position={{ lat: location.lat, lng: location.lng }}
                            onClick={() => handleMarkerClick(location)}
                        />
                    );
                })}
                {selectedLocation && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedLocation(null);
                        }}
                        position={{
                            lat: selectedLocation.lat,
                            lng: selectedLocation.lng,
                        }}
                    >
                        <div>
                            <p>location</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};
