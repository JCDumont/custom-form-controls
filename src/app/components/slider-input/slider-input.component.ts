import { Component, forwardRef, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
export class SliderInputComponent extends CustomFormControl implements OnChanges {


  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() steps: number = 1;

  inputValue: number = this.formControl.value || 0;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if ( changes.formControl ) {
      this.inputValue = this.formControl.value;
    }
  }
}

