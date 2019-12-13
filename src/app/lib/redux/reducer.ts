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

function debugReduxLog(reducer: ActionReducer<any>): ActionReducer<any> {
  const LOG_PREFIX = '[REDUX] ';

  return function(state, action) {
    console.log(LOG_PREFIX + `state`, state);
    console.log(LOG_PREFIX + `action`, action);

    return reducer(state, action);
  }
}

const metaReducers: MetaReducer<AppState>[] = !environment.production ?
[
  debugReduxLog,
  localStorageSyncReducer
] : [
  localStorageSyncReducer
];

export {
  AppState,
  reducers,
  debugReduxLog as debugLog,
  localStorageSyncReducer,
  metaReducers,
  selectShoppingState,
};