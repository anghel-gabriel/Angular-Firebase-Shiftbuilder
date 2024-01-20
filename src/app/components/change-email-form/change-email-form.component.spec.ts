import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailFormComponent } from './change-email-form.component';

describe('ChangeEmailFormComponent', () => {
  let component: ChangeEmailFormComponent;
  let fixture: ComponentFixture<ChangeEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeEmailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
