import React, { useEffect, useState, useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import {
    GoogleMap,
    LoadScript,
    InfoWindow,
    Marker,
} from '@react-google-maps/api';

import { StoreContext } from '../../utils/store';

import { GOOGLE_MAPS_API_KEY, STORE_ACTIONS } from '../../utils/config';

import '../../styles/map.css';

export const GoogleMaps = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { locations } = state;

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialMapCenterLocation = { lat: 0, lng: 0 };

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
            rating: 5,
        };
        handleDispatch(STORE_ACTIONS.LOCATIONS, [...locations, newLocation]);
    }

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    return (
        <section className="google-map">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    onClick={handleMapClick}
                    center={center}
                    mapContainerStyle={containerStyle}
                    zoom={4}
                    options={{
                        fullscreenControl: false,
                        streetViewControl: false,
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
                            <div>
                                <p>{selectedLocation.name}</p>
                                <Rating
                                    ratingValue={100}
                                    size={50}
                                    transition
                                    className="view-locations-rating"
                                />
                                        <form>
            <input id="name" type="text" placeholder="Name of Location"/>
            <input id="lat" type="text" placeholder="latitude"/>
            <input id="lng" type="text" placeholder="longitude"/>
        </form>
                                <button>Edit</button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </section>
    );
};
