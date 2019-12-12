import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class ShoppingPage implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  items: IShopItem[];
  totalPrice: number;

  constructor(
    private modalController: ModalController,
    private shopItemStore: ShopItemStoreService,
  ) { }

  ngOnInit() {
    this.shopItemStore.items$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((items) => {
      this.items = items;
    });
    this.shopItemStore.totalPrice$.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAddItem(): void {
    this.modalController.create({
      component: ShopItemDetailComponent,
    })
    .then((modal) => {
      modal.present();
    });
  }

  removeAll(): void {
    this.shopItemStore.clearItems();
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
