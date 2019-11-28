import { createAction, props } from '@ngrx/store';

import {
    IShopItem,
} from '../lib';

export const addItem = createAction(
    '[Shpping] Add Item',
    props<{item: IShopItem}>(),
);

export const delItem = createAction(
    '[Shpping] Del Item',
    props<{id: string}>(),
);

export const updateItem = createAction(
    '[Shopping] Update Item',
    props<{item: IShopItem}>(),
);

export const delAllItem = createAction(
    '[Shopping] Del All Item',
);