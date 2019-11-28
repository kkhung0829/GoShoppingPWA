import { Action, createReducer, on } from '@ngrx/store';
import * as ShoppingActions from '../actions/shopping.action';
import { List } from 'immutable';

import {
    IShopItem,
} from '../lib';

export interface ShoppingState {
    itemList: List<IShopItem>,
}

const initialState: ShoppingState = {
    itemList: List<IShopItem>(),
};

export const getItems = (state: ShoppingState) => state.itemList;

const shoppingReducer = createReducer(
    initialState,
    on( ShoppingActions.addItem,
        (state, { item }) => ({
            ...state,
            itemList: state.itemList.unshift(item),
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
            itemList: List<IShopItem>(),
        })),
);

export function reducer(state: ShoppingState | undefined, action: Action) {
    return shoppingReducer(state, action);
}