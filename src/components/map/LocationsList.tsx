import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { StoreContext } from '../../utils/store';
import { LOCAL_PATH, LOCAL_STORAGE, STORE_ACTIONS } from '../../utils/config';

import '../../styles/view-location.css';

export const ViewLocations = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { locations, user, friendName } = state;

    const navigate = useNavigate();

    const [showUserOptions, setShowUSerOptions] = useState(false);

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.JWT);

        handleDispatch(STORE_ACTIONS.USER, null);

        navigate(LOCAL_PATH.HOME);
    };

    const handleShowOption = () => setShowUSerOptions(!showUserOptions);

    const handleLocationSelection = (location: any) =>
        handleDispatch(STORE_ACTIONS.SELECTED_LOCATION, location);

    const listTitle = () =>
        !friendName ? 'My Places' : `${friendName}'s Places`;

    return (
        <section className="view-locations">
            <div className="view-locations-container">
                <section className="sidebar-header">
                    <div className="sidebar-header-main">
                        <div>
                            <Link to={LOCAL_PATH.DASHBOARD}>
                                <button className="sidebar-header-button">
                                    Back to Dashboard
                                </button>
                            </Link>
                        </div>
                        <div className="sidebar-header-profile">
                            <h1>{user.username}</h1>
                            <img
                                className="sidebar-header-profile-img"
                                src={user.profileImage}
                                alt="user profile"
                                onClick={handleShowOption}
                            />
                        </div>
                    </div>
                    {showUserOptions && (
                        <div className="dashboard-sidebar-header-menu">
                            <Link to="">Edit Profile</Link>
                            <li>
                                <button
                                    className="sidebar-button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </div>
                    )}
                </section>

                <h1 className="dashboard-main-title">{listTitle()}</h1>
                {locations.map((location: any) => {
                    return (
                        <div
                            onClick={() => handleLocationSelection(location)}
                            className="view-locations-list-item"
                            key={location.id}
                        >
                            <li className="view-locations-list">
                                <p>{location.name}</p>
                                <Rating
                                    readonly={true}
                                    ratingValue={location.rating}
                                    allowHover={false}
                                />
                            </li>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
