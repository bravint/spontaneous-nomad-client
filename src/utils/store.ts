import { createContext } from 'react';

import { STORE_ACTIONS } from './config';
import { IAction, IGlobalState } from './model';

export const initialState = {
    friends: [],
    friendId: 0,
    friendName: '',
    locations: [],
    rating: 0,
    selectedLocation: null,
    user: null,
};

export const StoreContext = createContext<{
    state: IGlobalState;
    dispatch: (action: IAction) => void;
}>({
    state: initialState,
    dispatch: () => {},
});

export const reducer = (state: IGlobalState, action: IAction) => {
    switch (action.type) {
        case STORE_ACTIONS.FRIENDS:
            return {
                ...state,
                friends: action.payload,
            };
        case STORE_ACTIONS.LOCATIONS:
            return {
                ...state,
                locations: action.payload,
            };
        case STORE_ACTIONS.RATING:
            return {
                ...state,
                rating: action.payload,
            };
        case STORE_ACTIONS.SELECTED_LOCATION:
            return {
                ...state,
                selectedLocation: action.payload,
            };
        case STORE_ACTIONS.USER:
            return {
                ...state,
                user: action.payload,
            };
        case STORE_ACTIONS.FRIEND_ID:
            return {
                ...state,
                friendId: action.payload,
            };
        case STORE_ACTIONS.FRIEND_NAME:
            return {
                ...state,
                friendName: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
