import { TestBed } from '@angular/core/testing';

import { PenhubungService } from './penhubung.service';

describe('PenhubungService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PenhubungService = TestBed.get(PenhubungService);
    expect(service).toBeTruthy();
  });
});
