import { useContext, useEffect, useState } from 'react';

import { NUMBER_OF_RECENT_FRIENDS_TO_RENDER } from '../../utils/config';
import { StoreContext } from '../../utils/store';

export const SidebarFriends = () => {
    const { state } = useContext(StoreContext);

    const { friends } = state;

    const [recentFriends, setRecentFriends] = useState([]);

    useEffect(() => {
        const selectedFriends = friends.splice(0, NUMBER_OF_RECENT_FRIENDS_TO_RENDER);

        setRecentFriends(selectedFriends);
    }, [friends]);

    return (
        <div className="sidebar-friends-list">
            <h1 className="sidebar-title">Recently Added Friends</h1>
            {recentFriends.map((recentFriend: any) => {
                return (
                    <div
                        className="sidebar-friends-list-item"
                        key={recentFriend.id}
                    >
                        <img
                            className="sidebar-friends-list-profile-image"
                            src={recentFriend.profileImage}
                            alt="profile"
                        />
                        <p>{recentFriend.username}</p>
                    </div>
                );
            })}
        </div>
    );
};
