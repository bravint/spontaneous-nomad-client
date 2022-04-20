import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';

import '../../styles/dashboard.css';

export const MapLocation = () => {
    const { state } = useContext(StoreContext);

    const { locations } = state;

    const findLastLocation = (array: any) => array[array.length - 1];

    const lastLocation = findLastLocation(locations);

    return (
        <div className="view-last-location">
            {lastLocation && (
                <>
                    <h2>{lastLocation.name}</h2>
                    <Rating
                        readonly={true}
                        ratingValue={lastLocation.rating}
                        allowHover={false}
                    />
                </>
            )}
        </div>
    );
};
