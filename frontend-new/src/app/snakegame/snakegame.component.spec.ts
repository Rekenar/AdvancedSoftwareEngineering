import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakegameComponent } from './snakegame.component';

describe('SnakegameComponent', () => {
  let component: SnakegameComponent;
  let fixture: ComponentFixture<SnakegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakegameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
