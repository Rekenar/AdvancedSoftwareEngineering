import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmostModeComponent } from './almost-mode.component';

describe('AlmostModeComponent', () => {
  let component: AlmostModeComponent;
  let fixture: ComponentFixture<AlmostModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmostModeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmostModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
