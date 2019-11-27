import { TestBed } from '@angular/core/testing';

import { ShopItemStoreService } from './shop-item-store.service';

describe('ShopItemStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopItemStoreService = TestBed.get(ShopItemStoreService);
    expect(service).toBeTruthy();
  });
});
