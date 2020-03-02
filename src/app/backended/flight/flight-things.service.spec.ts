import { TestBed } from '@angular/core/testing';

import { FlightThingsService } from './flight-things.service';

describe('FlightThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightThingsService = TestBed.get(FlightThingsService);
    expect(service).toBeTruthy();
  });
});
