import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingPageRoutingModule } from './shopping-routing.module';

import {
  LibModule,
} from '../../lib';

import { ShoppingPage } from './shopping.page';
import { ShopItemComponent } from './shop-item/shop-item.component';

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
  ]
})
export class ShoppingPageModule {}
