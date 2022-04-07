import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleMap, Marker } from '@react-google-maps/api';

import { StoreContext } from '../../utils/store';

import '../../styles/dashboard.css';

export const GoogleMiniMap = () => {
    const { state } = useContext(StoreContext);

    const { locations } = state;

    const navigate = useNavigate();

    const findLastLocation = (array) => array[array.length - 1];

    const lastLocation = findLastLocation(locations);

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const handleMapClick = () => navigate('../map');

    return (
        <>
            {lastLocation && (
                <section className="google-mini-maps">
                    <GoogleMap
                        onClick={handleMapClick}
                        center={{
                            lat: lastLocation.lat,
                            lng: lastLocation.lng,
                        }}
                        mapContainerStyle={containerStyle}
                        zoom={4}
                        options={{
                            fullscreenControl: false,
                            streetViewControl: false,
                            mapTypeId: 'satellite',
                        }}
                    >
                        <Marker
                            key={lastLocation.id}
                            position={{
                                lat: lastLocation.lat,
                                lng: lastLocation.lng,
                            }}
                            onClick={handleMapClick}
                        />
                    </GoogleMap>
                </section>
            )}
        </>
    );
};
