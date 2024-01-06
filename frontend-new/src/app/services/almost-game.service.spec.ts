import { TestBed } from '@angular/core/testing';

import { AlmostGameService } from './almost-game.service';

describe('AlmostGameService', () => {
  let service: AlmostGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmostGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
