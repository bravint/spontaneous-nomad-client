import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { TopLocations } from './TopLocations';
import { RecentlyAddedFriends } from './RecentlyAddedFriends';
import { SidebarFooter } from '../SidebarFooter';

import { StoreContext } from '../../utils/store';
import { LOCAL_PATH, LOCAL_STORAGE, STORE_ACTIONS } from '../../utils/config';

import '../../styles/dashboard.css'

export const DashboardSidebar = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { user } = state;

    const navigate = useNavigate();

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.JWT);

        handleDispatch(STORE_ACTIONS.USER, null);

        navigate(LOCAL_PATH.ROOT);
    };

    return (
        <section className="dashboard-sidebar">
            <div>
                <div className="dashboard-sidebar-profile-container">
                    <img
                        className="dashboard-sidebar-profile-img"
                        src={user.profileImage}
                        alt="user profile"
                    />
                    <h1>{user.username}</h1>
                </div>
                <div dashboard-sidebar-button-container>
                    <Link to="">
                        <button className="dashboard-sidebar-button">
                            Edit Profile
                        </button>
                    </Link>
                    <li>
                        <button
                            className="dashboard-sidebar-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                </div>
            </div>
            <section className="sidebar-stats">
                <TopLocations />
                <RecentlyAddedFriends />
            </section>
            <SidebarFooter />
        </section>
    );
};
