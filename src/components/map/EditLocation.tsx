/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';

import { HTTP_AUTH_TYPE, HTTP_METHOD, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../../utils/config';
import { ILocation } from '../../utils/model';
import { StoreContext, initialState } from '../../utils/store';

import '../../styles/map.css';

export const EditLocation = () => {
    const { dispatch, state } = useContext(StoreContext);

    const { locations, selectedLocation, friendId } = state;

    const handleDispatch = (type: string, payload: Array<ILocation> | null) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialForm = {
        name: selectedLocation.name as string,
        lat: selectedLocation.lat as number,
        lng: selectedLocation.lng as number,
    };

    const initialRating = selectedLocation.rating as number;

    const [form, setForm] = useState(initialForm);
    const [rating, setRating] = useState(initialRating);

    useEffect(() => {
        setForm(initialForm);
    }, [selectedLocation]);

    const handleChange = (event: React.SyntheticEvent): void => {
        const target = event.target as HTMLInputElement;

        setForm({ ...form, [target.name]: target.value });
    };

    const handleRatingChange = (rate: number) => setRating(rate);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const locationId = selectedLocation.id as number;

        const ratingId = selectedLocation.ratingId as number;

        const locationToCreate = {
            ...form,
            rating: rating,
            ratingId: ratingId,
        };

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const response = await fetch(`${SERVER_URL.LOCATION}/${locationId}`, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'Application/json',
                Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
            },
            body: JSON.stringify(locationToCreate),
        });

        const result = await response.json();

        if (result.data) {
            const filteredLocations = locations.filter(
                (location: any) => location.id !== selectedLocation.id
            );

            handleDispatch(STORE_ACTIONS.LOCATIONS, [
                ...filteredLocations,
                result.data,
            ]);

            handleDispatch(
                STORE_ACTIONS.SELECTED_LOCATION,
                initialState.selectedLocation
            );
        }
    };

    const handleDelete = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const locationId = selectedLocation.id;

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const response = await fetch(`${SERVER_URL.LOCATION}/${locationId}`, {
            method: HTTP_METHOD.DELETE,
            headers: {
                Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
            },
        });

        const result = await response.json();

        if (result.data) {
            const filteredLocations = locations.filter((location: any) => location.id !== selectedLocation.id);

            handleDispatch(STORE_ACTIONS.LOCATIONS, filteredLocations);

            handleDispatch(STORE_ACTIONS.SELECTED_LOCATION, initialState.selectedLocation);
        }
    };

    return (
        <>
            {friendId > 0 && (
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
            {friendId < 1 && (
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
