import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../../utils/store';
import { LOCAL_PATH, STORE_ACTIONS } from '../../utils/config';

import '../../styles/friends-list.css';

export const FriendsList = () => {
    const { state, dispatch } = useContext(StoreContext);

    const { friends } = state;

    const navigate = useNavigate();

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleFriendClick = (friend: any) => {
        handleDispatch(STORE_ACTIONS.FRIEND_ID, friend.id);

        handleDispatch(STORE_ACTIONS.FRIEND_NAME, friend.username);

        navigate(LOCAL_PATH.MAP);
    };

    return (
        <div className="friends-list-container">
            <h1 className="dashboard-main-title">Following</h1>
            {friends && (
                <div className="friends-list">
                    {friends.map((friend: any) => {
                        return (
                            <div
                                className="friends-list-item"
                                key={friend.id}
                                onClick={() => handleFriendClick(friend)}
                            >
                                <div className="friends-list-item-profile">
                                    <img
                                        className="friends-list-profile-image"
                                        src={friend.profileImage}
                                        alt="profile"
                                    />
                                    <p>{friend.username}</p>
                                </div>
                                <div className="friends-list-item-button">
                                    <p>Unfollow</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
