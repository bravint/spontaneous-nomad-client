import React, { useState, useContext } from 'react';

import { StoreContext } from '../../utils/store';

import {
    HTTP_AUTH_TYPE,
    HTTP_METHOD,
    LOCAL_STORAGE,
    STORE_ACTIONS,
} from '../../utils/config';

export const CreateLocation = () => {
    const { dispatch, state } = useContext(StoreContext);

    const { locations } = state;

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialForm = {
        name: '',
        lat: 0,
        lng: 0,
        rating: 0,
    };

    const [form, setForm] = useState(initialForm);

    const handleChange = (event: any) => {
        const { name, value } = event;

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const response = await fetch('http://localhost:4000/location', {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'Application/json',
                Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
            },
            body: JSON.stringify(form),
        });
        const result = await response.json();

        if (result.data) {
            handleDispatch(STORE_ACTIONS.LOCATIONS, [...locations, result.data]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="name"
                type="text"
                placeholder="Name of Location"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                id="lat"
                type="text"
                placeholder="latitude"
                value={form.lat}
                onChange={handleChange}
                readOnly
                required
            />
            <input
                id="lng"
                type="text"
                placeholder="longitude"
                value={form.lng}
                onChange={handleChange}
                readOnly
                required
            />
            <button type="submit">Add Location</button>
        </form>
    );
};
