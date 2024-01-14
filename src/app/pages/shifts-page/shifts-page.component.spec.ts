import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsPageComponent } from './shifts-page.component';

describe('ShiftsPageComponent', () => {
  let component: ShiftsPageComponent;
  let fixture: ComponentFixture<ShiftsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftsPageComponent]
    });
    fixture = TestBed.createComponent(ShiftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
