import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';
import { STORE_ACTIONS } from '../../utils/config';

import '../../styles/view-location.css';

export const ViewLocationsDashboard = () => {
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
        <div className="friends-list-container">
            <h1 className="dashboard-main-title">My Places</h1>
            <div className="friends-list">
                {locations.map((location: any) => {
                    return (
                        <div className="friends-list-item" key={location.id}>
                            <div
                                className="friends-list-item"
                                key={location.id}
                                onClick={() =>
                                    handleLocationSelection(location)
                                }
                            >
                                <p>{location.name}</p>
                                <Rating
                                    readonly={true}
                                    ratingValue={location.rating[0].ratings}
                                    allowHover={false}
                                />
                            </div>
                            <div>
                                <p>placeholder</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
