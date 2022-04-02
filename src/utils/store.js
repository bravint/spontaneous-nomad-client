import { createContext } from 'react';

import { STORE_ACTIONS } from './config';

export const initialState = {
    user: '',
};

export const StoreContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case STORE_ACTIONS.USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};