import { createContext } from 'react';

import { STORE_ACTIONS } from './config';

export const StoreContext = createContext(undefined);

export const initialState = {
    user: '',
};

export const reducer = (state: IState, action: IActionUser) => {
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

interface IActionUser {
    type: string;
    payload: object
}

interface IState{
    user: object
}