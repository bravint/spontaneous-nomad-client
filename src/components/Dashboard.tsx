import React, { useContext, useEffect } from 'react';

import { Header } from './Header';

import { HTTP_AUTH_TYPE, HTTP_METHOD, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../utils/config';
import { StoreContext } from '../utils/store';

export const Dashboard = () => {
    const { dispatch } = useContext(StoreContext);

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        const fetchLocations = async () => {
            const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

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

        fetchLocations();
    },[]);

    return (
        <section className="dashboard">
            <Header />
        </section>
    );
};
