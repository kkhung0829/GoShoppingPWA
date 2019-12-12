import { createAction, props } from '@ngrx/store';

import { IShopItem } from '../../models';
import actions from '../actionTypes';

const addItem = createAction(
    actions.SHOPPING_ITEMS_ADD,
    props<{item: IShopItem}>(),
);

const delItem = createAction(
    actions.SHOPPING_ITEMS_DEL,
    props<{id: string}>(),
);

const incItemUnit = createAction(
    actions.SHOPPING_ITEMS_INC_UNIT,
    props<{id: string}>(),
);

const decItemUnit = createAction(
    actions.SHOPPING_ITEMS_DEC_UNIT,
    props<{id: string}>(),
);

const updateItem = createAction(
    actions.SHOPPING_ITEMS_UPDATE,
    props<{item: IShopItem}>(),
);

const clearItems = createAction(
    actions.SHOPPING_ITEMS_CLEAR,
);

export {
    addItem,
    delItem,
    incItemUnit,
    decItemUnit,
    updateItem,
    clearItems ,
};