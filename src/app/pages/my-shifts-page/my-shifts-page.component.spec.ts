import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShiftsPageComponent } from './my-shifts-page.component';

describe('MyShiftsPageComponent', () => {
  let component: MyShiftsPageComponent;
  let fixture: ComponentFixture<MyShiftsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyShiftsPageComponent]
    });
    fixture = TestBed.createComponent(MyShiftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
