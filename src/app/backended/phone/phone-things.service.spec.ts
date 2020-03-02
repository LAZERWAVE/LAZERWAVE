import { TestBed } from '@angular/core/testing';

import { PhoneThingsService } from './phone-things.service';

describe('PhoneThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneThingsService = TestBed.get(PhoneThingsService);
    expect(service).toBeTruthy();
  });
});
