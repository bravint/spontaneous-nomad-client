import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleMap, Marker } from '@react-google-maps/api';

import { StoreContext } from '../../utils/store';
import { LOCAL_PATH } from '../../utils/config';

import '../../styles/dashboard.css';

export const GoogleMiniMap = () => {
    const { state } = useContext(StoreContext);

    const { locations } = state;

    const navigate = useNavigate();

    const findLastLocation = (array: any) => array[array.length - 1];

    const lastLocation = findLastLocation(locations);

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const handleMapClick = () => navigate(LOCAL_PATH.MAP);

    return (
        <div className="google-mini-map">
            <h1>Last location added</h1>
            {lastLocation && (
                <div className="google-map">
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
                            disableDefaultUI: true,
                            mapTypeId: 'hybrid',
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
                </div>
            )}
        </div>
    );
};
