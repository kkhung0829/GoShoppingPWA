import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {
  ShopItem,
} from '../models';

const STORAGE_KEY = 'shopItem';

@Injectable({
  providedIn: 'root'
})
export class ShopItemStoreService {

  constructor(private storage: Storage) { }

  reload(): Promise<ShopItem[]> {
    return this.storage.get(STORAGE_KEY)
    .then((val) => {
      if (val) {
        return JSON.parse(val) as ShopItem[];
      } else {
        return [] as ShopItem[];
      }
    });
  }

  save(items: ShopItem[]): Promise<any> {
    return this.storage.set(STORAGE_KEY, JSON.stringify(items));
  }
}
