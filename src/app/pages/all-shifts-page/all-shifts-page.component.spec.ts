import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllShiftsPageComponent } from './all-shifts-page.component';

describe('AllShiftsPageComponent', () => {
  let component: AllShiftsPageComponent;
  let fixture: ComponentFixture<AllShiftsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllShiftsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllShiftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
