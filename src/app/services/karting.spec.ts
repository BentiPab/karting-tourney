import { TestBed } from '@angular/core/testing';

import { KartingService } from './karting';

describe('Karting', () => {
  let service: KartingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KartingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
