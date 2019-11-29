import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import {
  IShopItem,
} from '../models';
import * as ShopingActions from '../../actions/shopping.action';
import { AppState, getShoppingItems } from '../../reducers';

@Injectable({
  providedIn: 'root'
})
export class ShopItemStoreService {
  public items: Observable<IShopItem[]>;

  constructor(
    private storage: Storage,
    private store: Store<AppState>
  ) {
    this.items = this.store.select(getShoppingItems);
  }

  addItem(item: IShopItem): void {
    item._id = Math.random().toString(36);

    this.store.dispatch(ShopingActions.addItem({ item: item }));
  }

  delItem(id: string): void {
    this.store.dispatch(ShopingActions.delItem({ id: id }));
  }

  updateItem(item: IShopItem): void {
    this.store.dispatch(ShopingActions.updateItem({ item: item }));
  }

  delAllItem(): void {
    this.store.dispatch(ShopingActions.delAllItem());
  }
}
