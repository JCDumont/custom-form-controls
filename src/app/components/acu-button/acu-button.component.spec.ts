import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuButtonComponent } from './acu-button.component';

describe('AcuButtonComponent', () => {
  let component: AcuButtonComponent;
  let fixture: ComponentFixture<AcuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcuButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
