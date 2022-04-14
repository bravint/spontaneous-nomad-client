/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext, initialState } from '../../utils/store';
import {
    HTTP_AUTH_TYPE,
    HTTP_METHOD,
    LOCAL_STORAGE,
    STORE_ACTIONS,
} from '../../utils/config';

import '../../styles/map.css';

export const EditLocation = () => {
    const { dispatch, state } = useContext(StoreContext);

    const { locations, selectedLocation, friendId } = state;

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialForm = {
        name: selectedLocation.name,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
    };

    useEffect(() => {
        setForm(initialForm);
    }, [selectedLocation]);

    const initialRating = selectedLocation.rating;

    const [form, setForm] = useState(initialForm);
    const [rating, setRating] = useState(initialRating);

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleRatingChange = (rate: number) => setRating(rate);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const locationId = selectedLocation.id;

        const ratingId = selectedLocation.ratingId;

        const locationToCreate = {
            ...form,
            rating: rating,
            ratingId: ratingId,
        };

        console.log('locationToCreate', selectedLocation, locationToCreate)

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const response = await fetch(
            `http://localhost:4000/location/${locationId}`,
            {
                method: HTTP_METHOD.POST,
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
                body: JSON.stringify(locationToCreate),
            }
        );

        const result = await response.json();

        if (result.data) {
            const filteredLocations = locations.filter(
                (location: any) => location.id !== selectedLocation.id
            );

            handleDispatch(STORE_ACTIONS.LOCATIONS, [
                ...filteredLocations,
                result.data,
            ]);
        }

        handleDispatch(
            STORE_ACTIONS.SELECTED_LOCATION,
            initialState.selectedLocation
        );
    };

    const handleDelete = async (event: any) => {
        event.preventDefault();

        const locationId = selectedLocation.id;

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const response = await fetch(
            `http://localhost:4000/location/${locationId}`,
            {
                method: HTTP_METHOD.DELETE,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            }
        );

        const result = await response.json();

        if (result.data) {
            const filteredLocations = locations.filter(
                (location: any) => location.id !== selectedLocation.id
            );

            handleDispatch(STORE_ACTIONS.LOCATIONS, filteredLocations);

            handleDispatch(
                STORE_ACTIONS.SELECTED_LOCATION,
                initialState.selectedLocation
            );
        }
    };

    return (
        <>
            {friendId && (
                <div className="edit-location">
                    <h2>{selectedLocation.name}</h2>
                    <Rating
                        ratingValue={rating}
                        size={50}
                        transition
                        className="view-locations-rating"
                        readonly={true}
                    />
                </div>
            )}
            {!friendId && (
                <div className="edit-location">
                    <h2>{selectedLocation.name}</h2>
                    <Rating
                        ratingValue={rating}
                        size={50}
                        transition
                        className="view-locations-rating"
                        onClick={handleRatingChange}
                    />

                    <form onSubmit={handleSubmit}>
                        <input
                            name="name"
                            type="text"
                            placeholder="Name of Location"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </form>
                    <div className="edit-location-button-container">
                        <button
                            className="edit-location-button edit-button"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Edit
                        </button>
                        <button
                            className="edit-location-button"
                            type="submit"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
