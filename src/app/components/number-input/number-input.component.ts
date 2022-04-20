import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControl } from 'src/app/components/base/base-form-input';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NumberInputComponent)
    }
  ]
})
export class NumberInputComponent extends CustomFormControl implements ControlValueAccessor {

  @Input() format: string;

  constructor() {
    super();
  }

  writeValue( value: any, inputChange: boolean = false ): void {
    const decimalMax = this.format.substring(1, this.format.length);

    if ( decimalMax ) {
      value = parseFloat(`${value}`).toFixed(parseInt(decimalMax));
    }

    if (value !== `${this.formControl.value}` && !inputChange) {
      this.formControl.setValue(`${value}`, { emitEvent: false });
    }

    this.value = value;
    if ( !this.customFormControl ) {
      this.onChange?.(value);
    }
  }

  checkFormat(): void {
    const decimalMax = this.format.substring(1, this.format.length);
    let value = this.value;

    if ( decimalMax && `${this.formControl.value}` !== parseFloat(`${value}`).toFixed(parseInt(decimalMax))) {
      this.value = parseFloat(`${value}`).toFixed(parseInt(decimalMax));
      this.formControl.setValue(parseFloat(`${value}`).toFixed(parseInt(decimalMax)));
    }
  }

  checkInput(event): boolean {
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
        // Allow: Ctrl+C
        (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
        // Allow: Ctrl+V
        (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
        // Allow: Ctrl+X
        (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
        (event.keyCode === 90 && (event.ctrlKey || event.metaKey)) ||
        // Allow: home, end, left, right
        (event.keyCode >= 35 && event.keyCode <= 39)) {
          // let it happen, don't do anything
          return true;
        }
        // Ensure that it is a number and stop the keypress
        if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }


    return true;
  }
}
