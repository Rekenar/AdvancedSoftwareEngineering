import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmostMapComponent } from './almost-map.component';

describe('AlmostMapComponent', () => {
  let component: AlmostMapComponent;
  let fixture: ComponentFixture<AlmostMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmostMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmostMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
