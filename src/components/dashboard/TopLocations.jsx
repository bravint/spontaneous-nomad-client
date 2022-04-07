import { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';

export const TopLocations = () => {
    const { state } = useContext(StoreContext);

    const { locations } = state;

    const sortLocations = () => {
        let clonedLocations = [...locations];

        clonedLocations.sort((a, b) => {
            return b.rating[0].ratings - a.rating[0].ratings;
        });

        clonedLocations = clonedLocations.splice(0, 5);

        return clonedLocations;
    };

    const sortedLocations = sortLocations();

    

    return (
        <>
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
                                    ratingValue={location.rating[0].ratings}
                                    allowHover={false}
                                />
                            </li>
                        );
                    })}
                </>
            )}
        </>
    );
};
