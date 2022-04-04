import React, { useState, useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';

import {
    HTTP_AUTH_TYPE,
    HTTP_METHOD,
    LOCAL_STORAGE,
    STORE_ACTIONS,
} from '../../utils/config';

export const CreateLocation = (props: any) => {
    const {newLocation, setNewLocation} = props;

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
        lat: newLocation.lat,
        lng: newLocation.lng,
    };

    const initialRating = 0

    const [form, setForm] = useState(initialForm);
    const [rating, setRating] = useState(initialRating)

    console.log('state',{
        form,
        rating,
    })

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleRatingChange = (rate: number) => setRating(rate)

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const locationToCreate = {...form , 'rating': rating}

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const response = await fetch('http://localhost:4000/location', {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'Application/json',
                Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
            },
            body: JSON.stringify(locationToCreate),
        });
        const result = await response.json();

        console.log('returnedLocation', result.data)

        if (result.data) {
            handleDispatch(STORE_ACTIONS.LOCATIONS, [...locations, result.data]);
        }

        setNewLocation(null);
    };

    return (
        <>
        <h2>Create Location</h2>
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                placeholder="Name of Location"
                value={form.name}
                onChange={handleChange}
                required
            />
            <Rating ratingValue={rating} onClick={handleRatingChange}/>
            <button type="submit">Add Location</button>
        </form>
        </>
    );
};
