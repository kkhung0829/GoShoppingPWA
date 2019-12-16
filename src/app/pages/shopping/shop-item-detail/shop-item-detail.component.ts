import {
  Component,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  IShopItem,
  ShopItemStoreService,
  TakePhotoComponent,
} from '../../../lib';

@Component({
  selector: 'app-shop-item-detail',
  templateUrl: './shop-item-detail.component.html',
  styleUrls: ['./shop-item-detail.component.scss'],
})
export class ShopItemDetailComponent implements OnInit, OnDestroy {

  @Input() id: string;

  private unsubscribe$ = new Subject<void>();

  isMobile: boolean;
  title: string = '';
  myItem: IShopItem = {
    unitPrice: 0.0,
    numUnit: 1,
  };

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private shopItemStore: ShopItemStoreService,
  ) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    this.title = (this.id ? 'Edit' : 'Add') + ' Item';
    if (this.id) {
      this.shopItemStore.selectItemById$(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item) => {
        this.myItem = {...item};
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  save() {
    if (this.id) {
      this.shopItemStore.updateItem(this.myItem);
    } else {
      this.shopItemStore.addItem(this.myItem);
    }
    this.modalController.dismiss();
  }

  cancel() {
    this.modalController.dismiss();
  }

  remove() {
    if (this.id) {
      this.shopItemStore.delItem(this.id);
      this.modalController.dismiss();
    }
  }

  takePicture() {
    this.modalController.create({
      component: TakePhotoComponent,
      backdropDismiss: true,
    })
    .then((modal) => {
      modal.onDidDismiss()
      .then((data) => {
        if (data.data) {
          this.myItem.imgURI = data.data;
        }
      });
      modal.present();
    });
  }

  pickPhoto(files) {
    if (files.length === 0) return;

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) return;

    let reader = new FileReader();
    reader.onload = (_event) => {
      this.myItem.imgURI = reader.result as string;
    }
    reader.readAsDataURL(files[0]);
  }
}
