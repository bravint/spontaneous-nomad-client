import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';
import { STORE_ACTIONS } from '../../utils/config';

import '../../styles/view-location.css';

export const ViewLocations = () => {
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
        <div className="view-locations">
            <h1>My Places</h1>
            {locations.map((location: any) => {
                return (
                    <li
                        className="view-locations-list"
                        key={location.id}
                        onClick={() => handleLocationSelection(location)}
                    >
                        <div>
                            <p>placeholder</p>
                        </div>
                        <p>{location.name}</p>
                        <Rating
                            readonly={true}
                            ratingValue={location.rating[0].ratings}
                            allowHover={false}
                        />
                    </li>
                );
            })}
        </div>
    );
};
