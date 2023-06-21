import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectionScreenComponent } from './app-selection-screen.component';

describe('AppSelectionScreenComponent', () => {
  let component: AppSelectionScreenComponent;
  let fixture: ComponentFixture<AppSelectionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSelectionScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSelectionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
