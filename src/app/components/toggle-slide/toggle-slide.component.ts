import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControl } from 'src/app/components/base/base-form-input';

@Component({
  selector: 'app-toggle-slide',
  templateUrl: './toggle-slide.component.html',
  styleUrls: ['./toggle-slide.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleSlideComponent)
    }
  ]
})
export class ToggleSlideComponent extends CustomFormControl implements OnInit, ControlValueAccessor {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
