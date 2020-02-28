import { TestBed } from '@angular/core/testing';

import { EventThingsService } from './event-things.service';

describe('EventThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventThingsService = TestBed.get(EventThingsService);
    expect(service).toBeTruthy();
  });
});
