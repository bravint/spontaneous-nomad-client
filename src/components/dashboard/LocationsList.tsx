import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';
import { STORE_ACTIONS } from '../../utils/config';

import '../../styles/view-location.css';

export const LocationsList = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { locations } = state;

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleLocationSelection = (location: any) =>
        handleDispatch(STORE_ACTIONS.SELECTED_LOCATION, location);

    return (
        <div className="locations-list-container">
            <h1 className="dashboard-title">My Places</h1>
            <div className="locations-list">
                {locations.map((location: any) => {
                    return (
                        <div
                            className="locations-list-item"
                            key={location.id}
                            onClick={() => handleLocationSelection(location)}
                        >
                            <p>{location.name}</p>
                            <Rating
                                readonly={true}
                                ratingValue={location.ratings}
                                allowHover={false}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
