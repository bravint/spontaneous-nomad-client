import { useContext, useEffect, useState } from 'react';

import { Header } from './Header';
import { SidebarFooter } from './SidebarFooter';
import { TopLocations } from './dashboard/TopLocations';

import '../styles/dashboard.css';

import {
    HTTP_AUTH_TYPE,
    HTTP_METHOD,
    LOCAL_STORAGE,
    SERVER_URL,
    STORE_ACTIONS,
} from '../utils/config';
import { StoreContext } from '../utils/store';

export const Dashboard = () => {
    const { state, dispatch } = useContext(StoreContext);

    const [following, setFollowing] = useState([]);

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const { user } = state;

    console.log('states', { following }, state);

    useEffect(() => {
        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        const fetchLocations = async () => {
            const response = await fetch(SERVER_URL.LOCATION, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            });

            const result = await response.json();

            if (result.data) {
                handleDispatch(STORE_ACTIONS.LOCATIONS, result.data);
            }
        };

        const fetchFollowers = async () => {
            const response = await fetch(SERVER_URL.FOLLOW, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            });

            const result = await response.json();

            if (result.data) {
                setFollowing(result.data);
            }
        };

        fetchLocations();
        fetchFollowers();
    }, []);

    return (
        <section className="dashboard">
            <div className="dashboard-main">
            <Header />
            </div>
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
                    <div>
                        <button>Edit Profile</button>
                        <button>Logout</button>
                    </div>
                </div>
                <div>
                    <h1>Top 5 Places</h1>
                    <TopLocations />
                </div>
                <SidebarFooter />
            </section>
        </section>
    );
};
