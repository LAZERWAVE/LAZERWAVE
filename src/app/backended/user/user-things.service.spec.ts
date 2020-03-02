import { TestBed } from '@angular/core/testing';

import { UserThingsService } from './user-things.service';

describe('UserThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserThingsService = TestBed.get(UserThingsService);
    expect(service).toBeTruthy();
  });
});
