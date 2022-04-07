import { createContext } from 'react';

import { STORE_ACTIONS } from './config';

export const initialState = {
    friends: [],
    locations: [],
    rating: 0,
    selectedLocations: [],
    user: '',
};

export const StoreContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.FRIENDS:
            return {
                ...state,
                rating: action.payload,
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
                rating: action.payload,
            };

        case STORE_ACTIONS.USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
