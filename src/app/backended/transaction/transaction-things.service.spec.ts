import { TestBed } from '@angular/core/testing';

import { TransactionThingsService } from './transaction-things.service';

describe('TransactionThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionThingsService = TestBed.get(TransactionThingsService);
    expect(service).toBeTruthy();
  });
});
