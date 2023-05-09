import { TestBed } from '@angular/core/testing';

import { MarbleService } from './marble.service';

describe('MarbleService', () => {
  let service: MarbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
