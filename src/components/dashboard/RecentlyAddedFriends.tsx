import { useContext, useEffect, useState } from 'react';

import { NUMBER_OF_RECENT_FRIENDS_TO_RENDER } from '../../utils/config';
import { StoreContext } from '../../utils/store';

export const RecentlyAddedFriends = () => {
    const { state } = useContext(StoreContext);

    const { friends } = state;

    const [recentFriends, setRecentFriends] = useState([]);

    useEffect(() => {
        const selectedFriends = friends.splice(0, NUMBER_OF_RECENT_FRIENDS_TO_RENDER);

        setRecentFriends(selectedFriends);
    }, [friends]);

    return (
        <div className="dashboard-sidebar-friends-list">
            <h1>Recently Added Friends</h1>
            {recentFriends.map((recentFriend: any) => {
                return (
                    <div className="friends-list-item" key={recentFriend}>
                        <p>{recentFriend.username}</p>
                        <img
                            className="friends-list-profile-image"
                            src={recentFriend.profileImage}
                            alt="profile"
                        />
                    </div>
                );
            })}
        </div>
    );
};