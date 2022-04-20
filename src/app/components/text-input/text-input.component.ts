import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControl } from 'src/app/components/base/base-form-input';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent extends CustomFormControl implements ControlValueAccessor, OnInit {


  constructor() {
    super();
   }

  ngOnInit(): void {
  }

  writeValue( value: any, inputChange: boolean = false ): void {
    this.value = value;
    if (value !== this.formControl.value && !inputChange) {
      this.formControl.setValue(value);
    }
    this.onChange?.(value);
  }

}
