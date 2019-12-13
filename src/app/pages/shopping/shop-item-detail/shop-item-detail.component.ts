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
  Plugins,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';
const { Camera } = Plugins;

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

  title: string = '';
  myItem: IShopItem = {
    unitPrice: 0.0,
    numUnit: 1,
  };

  constructor(
    private modalController: ModalController,
    private shopItemStore: ShopItemStoreService,
  ) { }

  ngOnInit() {
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

  // async takePicture() {
  //   const LOG_PREFIX = '[ShopItemDetailComponent:takePicture] ';

  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     source: CameraSource.Prompt,
  //     resultType: CameraResultType.DataUrl
  //   }).catch((err) => {
  //     console.log(LOG_PREFIX + `error: ${JSON.stringify(err)}`);
  //   });

  //   if (image) {
  //     this.myItem.imgURI = image.dataUrl;
  //   }
  // }

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
}
