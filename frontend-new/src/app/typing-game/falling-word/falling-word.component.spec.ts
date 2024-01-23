import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallingWordComponent } from './falling-word.component';

describe('FallingWordComponent', () => {
  let component: FallingWordComponent;
  let fixture: ComponentFixture<FallingWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallingWordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FallingWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
