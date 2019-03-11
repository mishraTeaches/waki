import { TestBed } from '@angular/core/testing';

import { WakiServiceService } from './waki-service.service';

describe('WakiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WakiServiceService = TestBed.get(WakiServiceService);
    expect(service).toBeTruthy();
  });
});
