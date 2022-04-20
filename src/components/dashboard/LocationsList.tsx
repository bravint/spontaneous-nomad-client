import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { STORE_ACTIONS } from '../../utils/config';
import { ILocation } from '../../utils/model';
import { StoreContext } from '../../utils/store';

import '../../styles/view-location.css';

export const LocationsList = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { locations } = state;

    const handleDispatch = (type: string, payload: ILocation) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleLocationSelection = (location: ILocation) => handleDispatch(STORE_ACTIONS.SELECTED_LOCATION, location);

    return (
        <div className="locations-list-container">
            <h1 className="dashboard-title">My Places</h1>
            <div className="locations-list">
                {locations.map((location: ILocation) => {
                    return (
                        <div
                            className="locations-list-item"
                            key={location.id}
                            onClick={() => handleLocationSelection(location)}
                        >
                            <p>{location.name}</p>
                            <Rating
                                readonly={true}
                                ratingValue={location.rating}
                                allowHover={false}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
