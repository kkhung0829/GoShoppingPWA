import { Injectable } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs";

import { AppState } from '../redux/reducer';
import { IShopItem } from '../models';
import { shopping as actions } from '../redux/actions';
import { shopping as selectors } from '../redux/selectors';

@Injectable({
  providedIn: 'root'
})
export class ShopItemStoreService {
  public items$: Observable<IShopItem[]>;
  public totalPrice$: Observable<number>;

  constructor(
    private storage: Storage,
    private store: Store<AppState>
  ) {
    this.items$ = this.store.pipe(select(selectors.selectItems));
    this.totalPrice$ = this.store.pipe(select(selectors.selectTotalPrice));
  }

  selectItemById$(id: string): Observable<IShopItem> {
    return this.store.pipe(
      select(selectors.makeSelectItemById(), {id})
    );
  }

  addItem(item: IShopItem): void {
    item._id = Math.random().toString(36);

    this.store.dispatch(actions.addItem({item}));
  }

  delItem(id: string): void {
    this.store.dispatch(actions.delItem({id}));
  }

  incItemUnit(id: string): void {
    this.store.dispatch(actions.incItemUnit({id}));
  }

  decItemUnit(id: string): void {
    this.store.dispatch(actions.decItemUnit({id}));
  }

  updateItem(item: IShopItem): void {
    this.store.dispatch(actions.updateItem({item}));
  }

  clearItems(): void {
    this.store.dispatch(actions.clearItems());
  }
}
