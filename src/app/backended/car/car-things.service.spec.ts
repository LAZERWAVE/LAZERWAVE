import { TestBed } from '@angular/core/testing';

import { CarThingsService } from './car-things.service';

describe('CarThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarThingsService = TestBed.get(CarThingsService);
    expect(service).toBeTruthy();
  });
});
