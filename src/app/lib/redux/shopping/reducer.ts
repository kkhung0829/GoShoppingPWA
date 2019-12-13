import {
    Action,
    createReducer,
    on
} from '@ngrx/store';
import { immute } from 'ngrx-immutable';

import {
    addItem,
    delItem,
    incItemUnit,
    decItemUnit,
    updateItem,
    clearItems,
} from './actions';
import { IShopItem } from '../../models';

interface ShoppingState {
    itemList: IShopItem[],
}

const initialState: ShoppingState = {
    itemList: [],
};


const shoppingReducer = createReducer(
    initialState,
    on( addItem,
        (state, { item }) => {
            let newItem = {...item, _id: Math.random().toString(36)};

            return immute(
                state,
                [ 'itemList' ],
                (itemList) => ([newItem, ...itemList])
            );
        }
    ),
    on( delItem,
        (state, { id }) => immute(
            state,
            [
                'itemList',
                (item) => (item._id === id),
            ],
            undefined
        )
    ),
    on( incItemUnit,
        (state, { id }) => immute(
            state,
            [
                'itemList',
                (item) => (item._id === id),
                'numUnit',
            ],
            (numUnit) => (numUnit + 1)
        )
    ),
    on( decItemUnit,
        (state, { id }) => immute(
            state,
            [
                'itemList',
                (item) => (item._id === id),
                'numUnit',
            ],
            (numUnit) => (numUnit > 0 ? numUnit - 1 : numUnit)
        )
    ),
    on( updateItem,
        (state, { item }) => immute(
            state,
            [
                'itemList',
                (orgItem) => (orgItem._id === item._id),
            ],
            (orgItem) => ({...orgItem, ...item})
        )
    ),
    on( clearItems,
        (state) => immute(
            state,
            [ 'itemList' ],
            []
        )
    ),
);

function reducer(state: ShoppingState | undefined, action: Action) {
    return shoppingReducer(state, action);
}

export {
    ShoppingState,
    reducer,
};