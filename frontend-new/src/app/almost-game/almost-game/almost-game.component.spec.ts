import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmostGameComponent } from './almost-game.component';

describe('AlmostGameComponent', () => {
  let component: AlmostGameComponent;
  let fixture: ComponentFixture<AlmostGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmostGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmostGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
