import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalCoopComponent } from './form-modal-coop.component';

describe('FormModalCoopComponent', () => {
  let component: FormModalCoopComponent;
  let fixture: ComponentFixture<FormModalCoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModalCoopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModalCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
