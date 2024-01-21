import { TestBed } from '@angular/core/testing';

import { SnakegameService } from './snakegame.service';

describe('SnakegameService', () => {
  let service: SnakegameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakegameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});



