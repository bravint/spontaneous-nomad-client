import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../../utils/store';
import { HTTP_METHOD, LOCAL_PATH, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../../utils/config';
import { IUser } from '../../utils/model';

export const OAuthSuccess = () => {
    const { dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleDispatch = (type: string, payload: IUser) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        const fetchUserFromCookie = async () => {
            try {
                const response = await fetch(SERVER_URL.AUTH_USER, {
                    method: HTTP_METHOD.GET,
                    credentials: 'include',
                });

                const result = await response.json();

                if (result.data) {
                    localStorage.setItem(LOCAL_STORAGE.JWT, result.token);

                    handleDispatch(STORE_ACTIONS.USER, result.data);

                    navigate(LOCAL_PATH.DASHBOARD);
                }
            } catch (error) {
                console.log(error);

                navigate(LOCAL_PATH.LOGIN);
            }
        };

        fetchUserFromCookie();
    });

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};