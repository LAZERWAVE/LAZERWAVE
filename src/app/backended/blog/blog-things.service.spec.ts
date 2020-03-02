import { TestBed } from '@angular/core/testing';

import { BlogThingsService } from './blog-things.service';

describe('BlogThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogThingsService = TestBed.get(BlogThingsService);
    expect(service).toBeTruthy();
  });
});
