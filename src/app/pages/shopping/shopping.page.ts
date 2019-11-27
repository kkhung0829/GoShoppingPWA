import { Component, OnInit } from '@angular/core';

import {
  ShopItem,
  ShopItemStoreService,
} from '../../lib';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  items: ShopItem[] = [
    {
      name: 'Test1',
      unitPrice: 1.3,
      numUnit: 2,
      imgURI: null,
    },
    {
      name: 'Test2',
      unitPrice: 1.0,
      numUnit: 2,
      imgURI: null,
    }
  ];

  constructor(private shopItemStore: ShopItemStoreService) { }

  ngOnInit() {
    this.shopItemStore.reload()
    .then((items: ShopItem[]) => {
      this.items = items;
    });  
  }

  calcTotalPrice(): number {
    let totalPrice : number = 0;
    let item : ShopItem;
    let index : number;

    for (index = 0; index < this.items.length; index++) {
      item = this.items[index];
      totalPrice += item.unitPrice * item.numUnit;
    }
    return totalPrice;
  }

  shopItemIncUnitCB(item: ShopItem): void {
    item.numUnit++;
  }

  shopItemDecUnitCB(item: ShopItem): void {
    if (item.numUnit > 0) {
      item.numUnit--;
    }
  }
}
