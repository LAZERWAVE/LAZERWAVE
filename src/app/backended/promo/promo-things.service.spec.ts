import { TestBed } from '@angular/core/testing';

import { PromoThingsService } from './promo-things.service';

describe('PromoThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromoThingsService = TestBed.get(PromoThingsService);
    expect(service).toBeTruthy();
  });
});
