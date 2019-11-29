import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import {
  IShopItem,
  ShopItemStoreService,
} from '../../lib';

import { ShopItemDetailComponent } from './shop-item-detail/shop-item-detail.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  items: IShopItem[];

  constructor(
    private modalController: ModalController,
    private shopItemStore: ShopItemStoreService,
  ) { }

  ngOnInit() {
    this.shopItemStore.items.subscribe((items) => {
      this.items = items;
    })
  }

  calcTotalPrice(): number {
    let totalPrice : number = 0;
    let item : IShopItem;
    let index : number;

    if (this.items) {
      for (index = 0; index < this.items.length; index++) {
        item = this.items[index];
        totalPrice += item.unitPrice * item.numUnit;
      }  
    }
    return totalPrice;
  }

  shopItemIncUnitCB(item: IShopItem): void {
    let myItem = {...item};

    myItem.numUnit++;
    this.shopItemStore.updateItem(myItem);
  }

  shopItemDecUnitCB(item: IShopItem): void {
    if (item.numUnit > 0) {
      let myItem = {...item};

      myItem.numUnit--;
      this.shopItemStore.updateItem(myItem);
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
          this.shopItemStore.addItem(data.data);
        }
      });
      modal.present();
    });
  }

  removeAll(): void {
    this.shopItemStore.delAllItem();
  }

  shopItemShowDetailCB(item: IShopItem): void {
    this.modalController.create({
      component: ShopItemDetailComponent,
      componentProps: {
        item: item,
      },
    })
    .then((modal) => {
      modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.shopItemStore.updateItem(data.data);
        }
      });
      modal.present();
    });
  }
}
