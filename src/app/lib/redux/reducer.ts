import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../../environments/environment';

import * as fromShopping from './shopping/reducer';

interface AppState {
  shopping: fromShopping.ShoppingState
}

const reducers: ActionReducerMap<AppState> = {
  shopping: fromShopping.reducer,
};

const selectShoppingState = createFeatureSelector<
  AppState,
  fromShopping.ShoppingState
>('shopping');

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['shopping'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: MetaReducer<AppState>[] = !environment.production ?
[
  localStorageSyncReducer
] : [
  localStorageSyncReducer
];

export {
  AppState,
  reducers,
  localStorageSyncReducer,
  metaReducers,
  selectShoppingState,
};