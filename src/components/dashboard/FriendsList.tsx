import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../../utils/store';
import {
    HTTP_AUTH_TYPE,
    HTTP_METHOD,
    LOCAL_PATH,
    LOCAL_STORAGE,
    SERVER_URL,
    STORE_ACTIONS,
} from '../../utils/config';

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

    const handleUnfollowClick = async (friend: any) => {
        const jwt = localStorage.getItem(LOCAL_STORAGE.JWT);

        if (!jwt) {
            return;
        }

        const response = await fetch(
            `${SERVER_URL.FOLLOW}/${friend.id}`, {
                method: HTTP_METHOD.DELETE,
                headers: {
                    Authorization: HTTP_AUTH_TYPE.BEARER + jwt,
                },
            }
        );

        const result = await response.json();

        if (result.data) {
            const updatedFriends = friends.filter(
                (eachFriend: any) => eachFriend.id !== friend.id
            );
            handleDispatch(STORE_ACTIONS.FRIENDS, updatedFriends);
        }
    };

    return (
        <div className="friends-list-container">
            <h1 className="dashboard-main-title">Following</h1>
            {friends && (
                <div className="friends-list">
                    {friends.map((friend: any) => {
                        return (
                            <div className="friends-list-item" key={friend.id}>
                                <div
                                    className="friends-list-item-profile"
                                    onClick={() => handleFriendClick(friend)}
                                >
                                    <img
                                        className="friends-list-profile-image"
                                        src={friend.profileImage}
                                        alt="profile"
                                    />
                                    <p>{friend.username}</p>
                                </div>
                                <div
                                    className="friends-list-item-button"
                                >
                                    <button className="friends-list-item-button-btn"
                                        onClick={() =>
                                            handleUnfollowClick(friend)
                                        }
                                    >
                                        Unfollow
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
