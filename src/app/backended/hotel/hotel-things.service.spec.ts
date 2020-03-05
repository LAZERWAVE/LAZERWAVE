import { TestBed } from '@angular/core/testing';

import { HotelThingsService } from './hotel-things.service';

describe('HotelThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelThingsService = TestBed.get(HotelThingsService);
    expect(service).toBeTruthy();
  });
});
