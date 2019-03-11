import { TestBed } from '@angular/core/testing';

import { CurrencyconvertService } from './currencyconvert.service';

describe('CurrencyconvertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyconvertService = TestBed.get(CurrencyconvertService);
    expect(service).toBeTruthy();
  });
});
