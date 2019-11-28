import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromShopping from './shopping.reducer';

export interface AppState {
  shopping: fromShopping.ShoppingState
}

export const getShoppingState = (state: AppState) => state.shopping;

export const getShoppingItems = createSelector(
  getShoppingState,
  fromShopping.getItems,
);

export const reducers: ActionReducerMap<AppState> = {
  shopping: fromShopping.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
