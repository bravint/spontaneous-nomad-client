import { createContext } from 'react';

import { STORE_ACTIONS } from './config';

export const initialState = {
    user: '',
    locations: [],
    rating: 0,
};

export const StoreContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.USER:
            return {
                ...state,
                user: action.payload,
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
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};
