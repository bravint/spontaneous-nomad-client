import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';

export const TopLocations = () => {
    const { state } = useContext(StoreContext);

    const { locations } = state;

    const sortLocations = () => {
        let clonedLocations = [...locations];

        clonedLocations.sort(
            (a, b) => b.rating - a.rating
        );

        clonedLocations = clonedLocations.splice(0, 5);

        return clonedLocations;
    };

    const sortedLocations = sortLocations();

    return (
        <div className="dashboard-sidebar-locations-list">
            <h1 className="sidebar-title">Top 5 Places</h1>
            {sortedLocations && (
                <>
                    {sortedLocations.map((location) => {
                        return (
                            <li
                                className="view-locations-list"
                                key={location.id}
                            >
                                <p>{location.name}</p>
                                <Rating
                                    readonly={true}
                                    ratingValue={location.rating}
                                    allowHover={false}
                                />
                            </li>
                        );
                    })}
                </>
            )}
        </div>
    );
};
