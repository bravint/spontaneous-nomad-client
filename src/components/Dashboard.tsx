import { useContext, useEffect } from 'react';

import {DashboardSidebar} from './dashboard/DashboardSidebar'
import { FriendsList } from './dashboard/ViewFriends';
import { Header } from './dashboard/Header';
import { SidebarFooter } from './SidebarFooter';
import { GoogleMiniMap } from './dashboard/GoogleMiniMap';
import { ViewLocations } from './map/ViewLocations';
import { ViewLastLocation } from './dashboard/ViewLastLocation';

import {
    HTTP_AUTH_TYPE,
    HTTP_METHOD,
    LOCAL_STORAGE,
    SERVER_URL,
    STORE_ACTIONS,
} from '../utils/config';
import { StoreContext } from '../utils/store';

import '../styles/dashboard.css';

export const Dashboard = () => {
    const { state, dispatch } = useContext(StoreContext);

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const { user } = state;

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

        const fetchFriends = async () => {
            const response = await fetch(SERVER_URL.FOLLOW, {
                method: HTTP_METHOD.GET,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            });

            const result = await response.json();

            if (result.data) {
                handleDispatch(STORE_ACTIONS.FRIENDS, result.data);
            }
        };

        fetchLocations();
        fetchFriends();
    }, []);

    return (
        <section className="dashboard">
            <section className="dashboard-main">
                <div>
                    <Header />
                </div>
                <div className="dashboard-main-map">
                    <GoogleMiniMap />
                    <ViewLastLocation />
                </div>
                <ViewLocations />
                <FriendsList />
            </section>
            <DashboardSidebar />
            <SidebarFooter />
        </section>
    );
};
