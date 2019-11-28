import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

import {
  ShopItem,
} from '../../../lib';

@Component({
  selector: 'app-shop-item-detail',
  templateUrl: './shop-item-detail.component.html',
  styleUrls: ['./shop-item-detail.component.scss'],
})
export class ShopItemDetailComponent implements OnInit {

  @Input() item: ShopItem;

  title: string = '';
  myItem: ShopItem = {
    unitPrice: 0.0,
    numUnit: 1,
  };

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.title = (this.item ? 'Edit' : 'Add') + ' Item';
    if (this.item) {
      this.myItem = this.item;
    }
  }

  save() {
    this.modalController.dismiss(this.myItem);
  }

  cancel() {
    this.modalController.dismiss();
  }
}
