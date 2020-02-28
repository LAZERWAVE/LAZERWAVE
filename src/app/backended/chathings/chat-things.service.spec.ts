import { TestBed } from '@angular/core/testing';

import { ChatThingsService } from './chat-things.service';

describe('ChatThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatThingsService = TestBed.get(ChatThingsService);
    expect(service).toBeTruthy();
  });
});
