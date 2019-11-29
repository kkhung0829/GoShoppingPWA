import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingActions from '../actions/shopping.action';

import {
    IShopItem,
} from '../lib';

export interface ShoppingState {
    itemList: IShopItem[],
}

const initialState: ShoppingState = {
    itemList: [],
};

export const getItems = (state: ShoppingState) => {
    return state.itemList;
}

const shoppingReducer = createReducer(
    initialState,
    on( ShoppingActions.addItem,
        (state, { item }) => ({
            ...state,
            itemList: [item, ...state.itemList],
        })),
    on( ShoppingActions.delItem,
        (state, { id }) => ({
            ...state,
            itemList: state.itemList.filter((value) => (value._id !== id)),
        })),
    on( ShoppingActions.updateItem,
        (state, { item }) => ({
            ...state,
            itemList: state.itemList.map((value) => {
                if (value._id === item._id) {
                    return {...value, ...item};
                } else {
                    return value;
                }
            }),
        })),
    on( ShoppingActions.delAllItem,
        (state) => ({
            ...state,
            itemList: [],
        })),
);

export function reducer(state: ShoppingState | undefined, action: Action) {
    return shoppingReducer(state, action);
}