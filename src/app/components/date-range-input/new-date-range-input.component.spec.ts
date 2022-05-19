import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDateRangeInputComponent } from './new-date-range-input.component';

describe('NewDateRangeInputComponent', () => {
  let component: NewDateRangeInputComponent;
  let fixture: ComponentFixture<NewDateRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDateRangeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDateRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
