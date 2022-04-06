import React, { useContext, useEffect, useState } from 'react';

import { Header } from './Header';

import {
    HTTP_AUTH_TYPE,
    HTTP_METHOD,
    LOCAL_STORAGE,
    SERVER_URL,
    STORE_ACTIONS,
} from '../utils/config';
import { StoreContext } from '../utils/store';

export const Dashboard = () => {
    const { state, dispatch } = useContext(StoreContext);

    const [following, setFollowing] = useState([])

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    console.log('states',{following}, state )

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

        const fetchFollowers = async () => {
            const response = await fetch(SERVER_URL.FOLLOW, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            });

            const result = await response.json();

            if (result.data) {
                setFollowing(result.data);
            }
        };

        fetchLocations();
        fetchFollowers();
    }, []);

    return (
        <section className="dashboard">
            <Header />
            <div>header</div>
            <div>search</div>
            <div>map</div>
            <div>feed</div>
            <div>followers</div>
        </section>
    );
};
