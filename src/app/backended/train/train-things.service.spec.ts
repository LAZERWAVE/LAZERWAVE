import { TestBed } from '@angular/core/testing';

import { TrainThingsService } from './train-things.service';

describe('TrainThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainThingsService = TestBed.get(TrainThingsService);
    expect(service).toBeTruthy();
  });
});
