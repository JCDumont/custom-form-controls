import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControl } from 'src/app/components/base/base-form-input';

@Component({
  selector: 'app-slider-input',
  templateUrl: './slider-input.component.html',
  styleUrls: ['./slider-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SliderInputComponent )
    }
  ]
})
export class SliderInputComponent extends CustomFormControl {


  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() steps: number = 1;

  inputValue: number = this.formControl.value || 0;

  constructor() {
    super();
  }
}

