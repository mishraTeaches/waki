import { TestBed } from '@angular/core/testing';

import { CartdetailService } from './cartdetail.service';

describe('CartdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartdetailService = TestBed.get(CartdetailService);
    expect(service).toBeTruthy();
  });
});
