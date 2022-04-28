import { useReducer, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';

import { Dashboard } from './Dashboard';
import { Home } from './Home';
import { Login } from './Login';
import { Map } from './Map';
import { OAuthSuccess } from './oauth/OAuthSuccess';
import { Register } from './Register';

import { StoreContext, reducer, initialState } from '../utils/store';
import { GOOGLE_MAPS_API_KEY, HTTP_AUTH_TYPE, HTTP_METHOD, LOCAL_PATH, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../utils/config';
import { IUser } from '../utils/model'

import '../styles/app.css';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user } = state;

    const navigate = useNavigate();

    console.log('global states', state);

    const handleDispatch = (type : string, payload: IUser) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        if (user) {
            return;
        }

        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        if (!jwt) {
            return;
        }

        const fetchUserFromToken = async () => {
            try {
                const response = await fetch(SERVER_URL.AUTH_USER, {
                    method: HTTP_METHOD.GET,
                    headers: {
                        Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                    },
                });

                const result = await response.json();

                if (result.data) {
                    handleDispatch(STORE_ACTIONS.USER, result.data);

                    navigate(LOCAL_PATH.MAP);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserFromToken();
    });

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <div className="app">
                    {user && (
                        <Routes>
                            <Route path={LOCAL_PATH.DASHBOARD} element={<Dashboard />} />
                            <Route path={LOCAL_PATH.MAP} element={<Map />} />
                            <Route path={LOCAL_PATH.SUCCESS} element={<OAuthSuccess />} />
                            <Route path={LOCAL_PATH.HOME} element={<Home />} />
                        </Routes>
                    )}
                    {!user && (
                        <Routes>
                            <Route path={LOCAL_PATH.HOME} element={<Home />} />
                            <Route path={LOCAL_PATH.LOGIN} element={<Login />} />
                            <Route path={LOCAL_PATH.REGISTER} element={<Register />} />
                            <Route path={LOCAL_PATH.SUCCESS} element={<OAuthSuccess />} />
                        </Routes>
                    )}
                </div>
            </LoadScript>
        </StoreContext.Provider>
    );
};
