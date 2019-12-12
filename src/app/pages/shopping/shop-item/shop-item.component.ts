import {
  Component,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  IShopItem,
  ShopItemStoreService
} from '../../../lib';

import { ShopItemDetailComponent } from '../shop-item-detail/shop-item-detail.component';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit, OnDestroy {

  @Input() id: string;

  private unsubscribe$ = new Subject<void>();

  item: IShopItem;

  constructor(
    private modalController: ModalController,
    private shopItemStore: ShopItemStoreService,
  ) { }

  ngOnInit() {
    this.shopItemStore.selectItemById$(this.id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((item) => {
      this.item = item;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onIncUnit() {
    this.shopItemStore.incItemUnit(this.id);
  }

  onDecUnit() {
    this.shopItemStore.decItemUnit(this.id);
  }

  showDetail() {
    this.modalController.create({
      component: ShopItemDetailComponent,
      componentProps: {
        id: this.id,
      },
    })
    .then((modal) => {
      modal.present();
    });
  }
}
