import { TestBed } from '@angular/core/testing';

import { LoginThingsService } from './login-things.service';

describe('LoginThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginThingsService = TestBed.get(LoginThingsService);
    expect(service).toBeTruthy();
  });
});
