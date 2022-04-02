import React, { useReducer, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { Footer } from './Footer';
import { OAuthSuccess } from './oauth/OauthSuccess';
import { Dashboard } from './Dashboard';

import { StoreContext, reducer, initialState } from '../utils/store';

import '../styles/app.css';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user } = state;

    console.log('state', {
        state,
    });

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

        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        const fetchUserFromToken = async () => {
            try {
                const response = await fetch(
                    'http://localhost:4000/auth/user',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    }
                );

                const result = await response.json();

                if (result.data) {
                    handleDispatch('user', result.data);

                    navigate('/dashboard');
                }

                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserFromToken();
    }, []);

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/success" element={<OAuthSuccess />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
                <Footer />
            </div>
        </StoreContext.Provider>
    );
};
