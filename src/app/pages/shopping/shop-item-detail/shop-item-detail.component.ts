import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  Plugins,
  CameraSource,
  CameraResultType,
} from '@capacitor/core';
const { Camera } = Plugins;

import {
  IShopItem,
} from '../../../lib';

@Component({
  selector: 'app-shop-item-detail',
  templateUrl: './shop-item-detail.component.html',
  styleUrls: ['./shop-item-detail.component.scss'],
})
export class ShopItemDetailComponent implements OnInit {

  @Input() item: IShopItem;

  title: string = '';
  myItem: IShopItem = {
    unitPrice: 0.0,
    numUnit: 1,
  };

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.title = (this.item ? 'Edit' : 'Add') + ' Item';
    if (this.item) {
      this.myItem = {...this.item};
    }
  }

  save() {
    this.modalController.dismiss(this.myItem);
  }

  cancel() {
    this.modalController.dismiss();
  }

  async takePicture() {
    const LOG_PREFIX = '[ShopItemDetailComponent:takePicture] ';

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.DataUrl
    }).catch((err) => {
      console.log(LOG_PREFIX + `error: ${JSON.stringify(err)}`);
    });

    if (image) {
      this.myItem.imgURI = image.dataUrl;
    }
  }
}
