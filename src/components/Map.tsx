import { useContext, useEffect } from 'react';

import { GoogleMaps } from './map/GoogleMap';
import { ViewLocations } from './map/LocationsList';

import { StoreContext } from '../utils/store';
import { HTTP_AUTH_TYPE, HTTP_METHOD, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../utils/config';
import { ILocation } from '../utils/model';

import '../styles/map.css';

export const Map = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { user, friendId } = state;

    const handleDispatch = (type: string, payload: Array<ILocation>): void => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        if (user.id === friendId || !friendId) {
            return;
        }

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const fetchLocations = async () => {
            const response = await fetch(`${SERVER_URL.LOCATION}/${friendId}`, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            });

            const result = await response.json();

            if (result.data) {
                handleDispatch(STORE_ACTIONS.LOCATIONS, result.data);
            }
        };

        fetchLocations();
    }, [friendId]);

    return (
        <section className="map">
            <GoogleMaps />
            <ViewLocations />
        </section>
    );
};