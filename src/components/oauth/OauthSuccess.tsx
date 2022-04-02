import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../../utils/store';

import { HTTP_METHOD } from '../../utils/config';

export const OAuthSuccess = () => {
    const { dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleDispatch = (type :any, payload :any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };
    
    useEffect(() => {
        const fetchUserFromToken = async () => {
            try {
                const response = await fetch('http://localhost:4000/auth/user', {
                        method: HTTP_METHOD.GET,
                        credentials: 'include',
                    }
                );

                const result = await response.json();

                if (result.data) {
                    localStorage.setItem('token', result.token);

                    handleDispatch('user', result.data);

                    navigate('/dashboard');
                }
            } catch (error) {
                console.log(error);

                navigate('/login');
            }
        };

        fetchUserFromToken();
    }, []);

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};
