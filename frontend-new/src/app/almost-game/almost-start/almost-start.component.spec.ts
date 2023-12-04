import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmostStartComponent } from './almost-start.component';

describe('AlmostStartComponent', () => {
  let component: AlmostStartComponent;
  let fixture: ComponentFixture<AlmostStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmostStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmostStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
