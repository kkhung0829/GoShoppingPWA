import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingPageRoutingModule } from './shopping-routing.module';

import {
  LibModule,
  TakePhotoComponent,
} from '../../lib';

import { ShoppingPage } from './shopping.page';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ShopItemDetailComponent } from './shop-item-detail/shop-item-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingPageRoutingModule,
    LibModule,
  ],
  declarations: [
    ShoppingPage,
    ShopItemComponent,
    ShopItemDetailComponent,
  ],
  entryComponents: [
    TakePhotoComponent,
    ShopItemDetailComponent,
  ],
})
export class ShoppingPageModule {}
