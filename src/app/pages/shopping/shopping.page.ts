import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {
  ShopItem,
  ShopItemStoreService,
} from '../../lib';

import { ShopItemDetailComponent } from './shop-item-detail/shop-item-detail.component';

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

  constructor(
    private modalController: ModalController,
    private shopItemStore: ShopItemStoreService,
  ) { }

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
    this.shopItemStore.save(this.items);
  }

  shopItemDecUnitCB(item: ShopItem): void {
    if (item.numUnit > 0) {
      item.numUnit--;
      this.shopItemStore.save(this.items);
    }
  }

  onAddItem(): void {
    this.modalController.create({
      component: ShopItemDetailComponent,
    })
    .then((modal) => {
      modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          let temp = this.items;

          this.items = [data.data as ShopItem].concat(temp);
          this.shopItemStore.save(this.items);
        }
      });
      modal.present();
    });
  }
}
