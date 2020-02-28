import { TestBed } from '@angular/core/testing';

import { RegisterThingsService } from './register-things.service';

describe('RegisterThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterThingsService = TestBed.get(RegisterThingsService);
    expect(service).toBeTruthy();
  });
});
