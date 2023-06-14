import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalUserComponent } from './form-modal-user.component';

describe('FormModalUserComponent', () => {
  let component: FormModalUserComponent;
  let fixture: ComponentFixture<FormModalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
