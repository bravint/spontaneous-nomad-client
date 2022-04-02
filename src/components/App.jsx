import { useReducer, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Home } from './Home';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Footer } from './Footer';
import { OAuthSuccess } from './oauth/OAuthSuccess';
import { Dashboard } from './Dashboard';

import { StoreContext, reducer, initialState } from '../utils/store';
import { HTTP_AUTH_TYPE, HTTP_METHOD, LOCAL_PATH, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../utils/config';

import '../styles/app.css';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user } = state;

    const navigate = useNavigate();

    const handleDispatch = (type, payload) => {
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

                    navigate(LOCAL_PATH.DASHBOARD);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserFromToken();
    });

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div className="app">
                <Routes>
                    <Route 
                        path={LOCAL_PATH.HOME} 
                        element={<Home />}
                    />
                    <Route 
                        path={LOCAL_PATH.LOGIN} 
                        element={<Login />}
                    />
                    <Route
                        path={LOCAL_PATH.REGISTER}
                        element={<Register />}
                    />
                    <Route
                        path={LOCAL_PATH.SUCCESS}
                        element={<OAuthSuccess />}
                    />
                    <Route
                        path={LOCAL_PATH.DASHBOARD}
                        element={<Dashboard />}
                    />
                </Routes>
                <Footer />
            </div>
        </StoreContext.Provider>
    );
};
