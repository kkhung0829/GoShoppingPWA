import {
    createSelector,
} from '@ngrx/store';

import { ShoppingState } from './reducer';
import { selectShoppingState } from '../reducer';

const selectItems = createSelector(
    selectShoppingState,
    (state: ShoppingState) => state.itemList
);

const selectTotalPrice = createSelector(
    selectItems,
    (items) => items.reduce(
        (total, item) => (total + item.unitPrice * item.numUnit),
        0
    )
);

const makeSelectItemById = () => createSelector(
    selectItems,
    (items, props) => items.find((item) => item._id === props.id)
);

export {
    selectItems,
    selectTotalPrice,
    makeSelectItemById,
};
  
  