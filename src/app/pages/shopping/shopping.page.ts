import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  trigger,
  transition,
  query,
  stagger,
  useAnimation,
} from '@angular/animations';
import {
  rotateInDownLeft,
  rotateOutUpRight,
  rubberBand,
} from 'ng-animate';

import {
  IShopItem,
  ShopItemStoreService,
} from '../../lib';

import { ShopItemDetailComponent } from './shop-item-detail/shop-item-detail.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
  animations: [
    trigger('myShopItemList', [
      transition(':enter', []),
      transition(':increment', [
        query(':enter', [
          stagger(500, useAnimation(rotateInDownLeft)),
        ]),
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(500, useAnimation(rotateOutUpRight)),
        ]),
      ]),
    ]),
    trigger('myPriceTrigger', [
      transition(':increment, :decrement', useAnimation(rubberBand)),
    ]),
  ],
})
export class ShoppingPage implements OnInit, OnDestroy {
  public items: IShopItem[];
  public totalPrice: number;
  public formatter4Title = (val) => ('Total: $' + val.toFixed(1));

  private unsubscribe$ = new Subject<void>();

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

  trackBy4ShopItemList(index: number, shopItem: IShopItem): any {
    return shopItem._id;
  }
}
