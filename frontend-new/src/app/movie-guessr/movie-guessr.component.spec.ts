import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGuessrComponent } from './movie-guessr.component';

describe('MovieGuessrComponent', () => {
  let component: MovieGuessrComponent;
  let fixture: ComponentFixture<MovieGuessrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieGuessrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieGuessrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
