import React, { useState, useContext } from 'react';

import { CreateLocation } from './CreateLocation';
import { EditLocation } from './EditLocation';

import {
    GoogleMap,
    LoadScript,
    InfoWindow,
    Marker,
} from '@react-google-maps/api';

import { StoreContext } from '../../utils/store';

import { GOOGLE_MAPS_API_KEY } from '../../utils/config';

import '../../styles/map.css';

export const GoogleMaps = (props) => {
    const { newLocation, setNewLocation } = props;

    const { state } = useContext(StoreContext);

    const { locations } = state;

    const initialMapCenter = {
        lat: 0,
        lng: 0,
    };

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [center, setCenter] = useState(initialMapCenter);

    const handleMarkerClick = (location) => setSelectedLocation(location);

    function handleMapClick(event) {
        const newCenter = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        setCenter(newCenter);

        const locationToCreate = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        setNewLocation(locationToCreate);
    }

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    console.log(selectedLocation, center);

    return (
        <section className="google-maps">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    onClick={handleMapClick}
                    center={center}
                    mapContainerStyle={containerStyle}
                    zoom={4}
                    options={{
                        fullscreenControl: false,
                        streetViewControl: false,
                        mapTypeId: 'satellite',
                    }}
                >
                    {locations.map((location) => {
                        return (
                            <Marker
                                key={location.id}
                                position={{
                                    lat: location.lat,
                                    lng: location.lng,
                                }}
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
                            <EditLocation
                                selectedLocation={selectedLocation}
                                setSelectedLocation={setSelectedLocation}
                            />
                        </InfoWindow>
                    )}
                    {newLocation && (
                        <InfoWindow
                            onCloseClick={() => {
                                setSelectedLocation(null);
                            }}
                            position={{
                                lat: newLocation.lat,
                                lng: newLocation.lng,
                            }}
                        >
                            <CreateLocation
                                newLocation={newLocation}
                                setNewLocation={setNewLocation}
                            />
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </section>
    );
};
