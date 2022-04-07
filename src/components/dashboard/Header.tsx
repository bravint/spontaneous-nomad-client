import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StoreContext } from '../../utils/store';
import { LOCAL_PATH, LOCAL_STORAGE, STORE_ACTIONS } from '../../utils/config';

import '../../styles/header.css';

export const Header = () => {
    const { state, dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const { user } = state;

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const capitaliseFirstLetter = (string: string) =>
        string.replace(/\b\w/g, (c: string) => c.toUpperCase());

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.JWT);

        handleDispatch(STORE_ACTIONS.USER, null);

        navigate(LOCAL_PATH.ROOT);
    };

    return (
        <header>
            <li>Welcome Back, {capitaliseFirstLetter(user.username)!}</li>
            <div>
            <Link to={LOCAL_PATH.MAP} className="router-link">
                <li className="header-link">Home</li>
            </Link>
            <Link to={LOCAL_PATH.MAP} className="router-link">
                <li className="header-link">Dashbaord</li>
            </Link>
            <Link to={LOCAL_PATH.MAP} className="router-link">
                <li className="header-link">Map</li>
            </Link>
            <Link to={LOCAL_PATH.MAP} className="router-link">
                <li className="header-link">Logout</li>
            </Link>
            </div>
        </header>
    );
};