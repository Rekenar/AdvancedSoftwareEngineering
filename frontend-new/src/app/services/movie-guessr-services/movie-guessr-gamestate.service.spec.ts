import { TestBed } from '@angular/core/testing';

import { MovieGuessrGamestateService } from './movie-guessr-gamestate.service';

describe('MovieGuessrGamestateService', () => {
  let service: MovieGuessrGamestateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieGuessrGamestateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
