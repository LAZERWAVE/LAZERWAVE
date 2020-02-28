import { TestBed } from '@angular/core/testing';

import { LocationThingysService } from './location-thingys.service';

describe('LocationThingysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationThingysService = TestBed.get(LocationThingysService);
    expect(service).toBeTruthy();
  });
});
