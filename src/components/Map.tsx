import { useContext, useEffect } from 'react';

import { GoogleMaps } from './map/Map';
import { LocationsList } from './map/LocationsList';

import { StoreContext, initialState } from '../utils/store';
import { HTTP_AUTH_TYPE, HTTP_METHOD, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../utils/config';
import { ILocation, IFriend } from '../utils/model';

import '../styles/map.css';

export const Map = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { user, friendId } = state;

    const handleDispatch = (type: string, payload: Array<ILocation> | IFriend | null | number | string): void => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const fetchLocations = async () => {
            const response = await fetch(SERVER_URL.LOCATION, {
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

        const fetchFriends = async () => {
            const response = await fetch(SERVER_URL.FOLLOW, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            });

            const result = await response.json();


            if (result.data) {
                handleDispatch(STORE_ACTIONS.FRIENDS, result.data);
            }
        };

        fetchLocations();
        fetchFriends();
        handleDispatch(STORE_ACTIONS.FRIEND_ID, initialState.friendId);
        handleDispatch(STORE_ACTIONS.FRIEND_NAME, initialState.friendName);
        handleDispatch( STORE_ACTIONS.SELECTED_LOCATION, initialState.selectedLocation);
    }, []);

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
            <LocationsList />
        </section>
    );
};