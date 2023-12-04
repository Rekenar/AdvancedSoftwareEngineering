import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmostAttrComponent } from './almost-attr.component';

describe('AlmostAttrComponent', () => {
  let component: AlmostAttrComponent;
  let fixture: ComponentFixture<AlmostAttrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmostAttrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmostAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
