import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';

import * as fromShopping from './shopping.reducer';

export interface AppState {
  shopping: fromShopping.ShoppingState
}

export const getShoppingState = (state: AppState) => {
  return state.shopping;
}

export const getShoppingItems = createSelector(
  getShoppingState,
  fromShopping.getItems,
);

export const reducers: ActionReducerMap<AppState> = {
  shopping: fromShopping.reducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['shopping'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ?
[
  localStorageSyncReducer
] : [
  localStorageSyncReducer
];
