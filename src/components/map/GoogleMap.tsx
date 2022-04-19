import { useState, useContext } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';

import { CreateLocation } from './CreateLocation';
import { EditLocation } from './EditLocation';

import { STORE_ACTIONS } from '../../utils/config';
import { ILocation } from '../../utils/model';
import { StoreContext, initialState } from '../../utils/store';

import '../../styles/map.css';

export const GoogleMaps = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { locations, selectedLocation, friendId } = state;

    const handleDispatch = (type: string, payload: ILocation | null) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialMapCenter = {
        lat: 0,
        lng: 0,
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const [newLocation, setNewLocation] = useState<ILocation | null>(null);
    const [center, setCenter] = useState(initialMapCenter);

    const handleMarkerClick = (location: ILocation) => handleDispatch(STORE_ACTIONS.SELECTED_LOCATION, location);

    function handleMapClick(event: any): void{
        if (friendId) {
            return;
        }

        const newCenter = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        setCenter(newCenter);

        const locationToCreate: any = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        setNewLocation(locationToCreate);
    }

    return (
        <section className="google-maps">
            <GoogleMap
                onClick={handleMapClick}
                center={center}
                mapContainerStyle={containerStyle}
                zoom={4}
                options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeId: 'hybrid',
                }}
            >
                {locations.map((location: ILocation) => {
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
                            handleDispatch(
                                STORE_ACTIONS.SELECTED_LOCATION,
                                initialState.selectedLocation
                            );
                            setNewLocation(null);
                        }}
                        position={{
                            lat: selectedLocation.lat,
                            lng: selectedLocation.lng,
                        }}
                    >
                        <EditLocation />
                    </InfoWindow>
                )}
                {newLocation && (
                    <InfoWindow
                        onCloseClick={() => {
                            handleDispatch(
                                STORE_ACTIONS.SELECTED_LOCATION,
                                initialState.selectedLocation
                            );
                            setNewLocation(null);
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
        </section>
    );
};
