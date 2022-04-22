import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl } from '@angular/forms';

@Directive()
export class CustomFormControl implements OnChanges, ControlValueAccessor {

  @Input() formControl: AbstractControl = new FormControl();

  @Input() label: string;

  @Input() disabled: boolean = false;

  @Input() fieldDisabledOverride: boolean = false; // This overrides disabled state

  @Input() prefix;

  @Input() suffix;

  @Input() showLabel: boolean = true;

  @Input() submitAttempt: boolean = false;

  @Input() debug: boolean = false; // Only to be used in dev / storybook

  onChange

  focused: boolean = false;

  value: any;

  customFormControl: boolean = false;

  onTouched: () => void;

  ngOnChanges ( changes: SimpleChanges): void {
    if ( changes.formControl ) {
      this.customFormControl = true;
    }
  }

  writeValue( value: any, inputChange: boolean = false ): void {
    if ( this.formControl.updateOn === 'blur' ) {
      return;
    }

    this.value = value;

    if (JSON.stringify(value) !== JSON.stringify(this.formControl.value) && !inputChange) {
      this.formControl.setValue(value);
    }

    // On want to trigger on change if it is not a form control
    if ( !this.customFormControl ) {
      this.onChange?.(value);
    }
  }

  registerOnChange (fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

    if ( this.fieldDisabledOverride ) {
      this.disabled = true;
      this.formControl.disable();
      return;
    }

    this.disabled = isDisabled;
    if (isDisabled === this.formControl.disabled) {
      return;
     }

    if ( this.disabled ) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
