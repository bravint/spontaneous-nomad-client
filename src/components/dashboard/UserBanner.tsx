import { useContext } from 'react';

import { StoreContext } from '../../utils/store';

export const UserBanner = () => {
    const { state } = useContext(StoreContext);

    const { user } = state;

    return (
        <div>
            <p>Welcome Back! {user.username}</p>
        </div>
    )

};
