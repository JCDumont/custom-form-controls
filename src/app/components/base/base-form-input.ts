import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl } from '@angular/forms';

@Directive()
export class CustomFormControl implements OnInit, OnChanges, ControlValueAccessor {

  @Input() formControl: AbstractControl = new FormControl();

  @Input() label: string;

  @Input() disabled: boolean = false;

  @Input() fieldDisabledOverride: boolean = false; // This overrides disabled state

  @Input() prefix: string;

  @Input() suffix: string;

  @Input() showLabel: boolean = true;

  @Input() submitAttempt: boolean = false;

  @Input() defaultValue: any;

  @Input() customErrorMessages: Record<string, string | (() => string)>

  @Input() debug: boolean = false; // Only to be used in dev / storybook

  onChange: (value: any) => void;

  onTouched: () => void;

  tooltipEnabled: boolean = false;

  showToolTip: (containerElement: HTMLElement, textElement: HTMLElement) => void = (containterElement, textElement) => {
    this.tooltipEnabled = containterElement.offsetWidth > ( textElement.offsetWidth - 41 )
  }

  focused: boolean = false;

  value: any;

  customFormControl: boolean = false;


  ngOnInit (): void {
    if ( !this.formControl.value && this.defaultValue !== undefined  ) {
      this.formControl.setValue(this.defaultValue, { emitEvent: false });
    }
  }

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

  onBlur(): void {
    this.focused = false;
    const noValue = this.value === ''
     || this.value === undefined
     || this.value === null
     || this.value?.length === 0;

    if ( noValue && this.defaultValue !== undefined  ) {
      this.value = JSON.parse(JSON.stringify(this.defaultValue));
      this.formControl.setValue(this.value);
    }
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
