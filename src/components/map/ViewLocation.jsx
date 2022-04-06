import React, { useContext } from 'react';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';

import '../../styles/view-location.css';

export const ViewLocation = () => {
    const { state } = useContext(StoreContext);

    const { locations } = state;

    const onClick = (event) => console.log(event);

    return (
        <section className="view-locations">
            <h1>My Locations:</h1>
            <div>
                {locations.map((location) => {
                    return (
                        <>
                            <li
                                className="view-locations-list"
                                key={location.id}
                            >
                                <div>
                                    <p>placeholder</p>
                                </div>
                                <p>{location.name}</p>
                                <Rating
                                    readonly={true}
                                    ratingValue={location.rating[0].ratings}
                                    allowHover={false}
                                    onClick={onClick}
                                />
                            </li>
                            {/* <div className="view-locations-list-button-container">
                                <button>Edit</button>
                                <button>Delete</button>
                            </div> */}
                        </>
                    );
                })}
            </div>
        </section>
    );
};
