import { TestBed } from '@angular/core/testing';

import { PenyatuService } from './penyatu.service';

describe('PenyatuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PenyatuService = TestBed.get(PenyatuService);
    expect(service).toBeTruthy();
  });
});
