import {
    Action,
    createReducer,
    on
} from '@ngrx/store';

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
        (state, { item }) => ({
            ...state,
            itemList: [item, ...state.itemList],
        })),
    on( delItem,
        (state, { id }) => ({
            ...state,
            itemList: state.itemList.filter((value) => (value._id !== id)),
        })),
    on( incItemUnit,
        (state, { id }) => ({
            ...state,
            itemList: state.itemList.map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        numUnit: item.numUnit + 1,
                    };
                } else {
                    return item;
                }
            }),
        })),
    on( decItemUnit,
        (state, { id }) => ({
            ...state,
            itemList: state.itemList.map((item) => {
                if ((item._id === id) && (item.numUnit > 0)) {
                    return {
                        ...item,
                        numUnit: item.numUnit - 1,
                    };
                } else {
                    return item;
                }
            }),
        })),
    on( updateItem,
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
    on( clearItems,
        (state) => ({
            ...state,
            itemList: [],
        })),
);

function reducer(state: ShoppingState | undefined, action: Action) {
    return shoppingReducer(state, action);
}

export {
    ShoppingState,
    reducer,
};