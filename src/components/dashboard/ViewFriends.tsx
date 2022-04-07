import { useContext } from 'react';

import { StoreContext } from '../../utils/store';

import '../../styles/friends-list.css';

export const FriendsList = () => {
    const { state } = useContext(StoreContext);

    const { friends } = state;

    return (
        <div className="friends-list">
            <h1>Following</h1>
            {friends && (
                <>
                    {friends.map((friend: any) => {
                        return (
                            <div className="friends-list-item" key={friend.id}>
                                <p>{friend.username}</p>
                                <img
                                    className="friends-list-profile-image"
                                    src={friend.profileImage}
                                    alt="profile"
                                />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};
