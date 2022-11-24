import { TestBed } from '@angular/core/testing';

import { ConversationConfigService } from './conversation-config.service';

describe('ConversationConfigService', () => {
  let service: ConversationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
