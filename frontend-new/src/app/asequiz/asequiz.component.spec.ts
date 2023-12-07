import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsequizComponent } from './asequiz.component';

describe('AsequizComponent', () => {
  let component: AsequizComponent;
  let fixture: ComponentFixture<AsequizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsequizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsequizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
