import { TestBed } from '@angular/core/testing';

import { MovieGuessrService } from './movie-guessr.service';

describe('MovieGuessrServiceService', () => {
  let service: MovieGuessrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieGuessrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
