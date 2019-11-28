import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { IShopItem } from '../../../lib';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {

  @Input() item: IShopItem;

  @Output() incUnit = new EventEmitter<void>();
  @Output() decUnit = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onIncUnit() {
    this.incUnit.emit();
  }

  onDecUnit() {
    this.decUnit.emit();
  }
}
