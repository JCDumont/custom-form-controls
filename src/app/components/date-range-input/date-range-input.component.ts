import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { CustomFormControl } from 'src/app/components/base/base-form-input';

@Component({
  selector: 'app-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateRangeInputComponent)
    }
  ]
})
export class DateRangeInputComponent extends CustomFormControl implements OnInit, OnChanges {

  @ViewChild( 'picker', { static: false }) startDatePicker: MatDateRangePicker<any>;


  @ViewChild( 'picker2', { static: false }) endDatePicker: MatDateRangePicker<any>;

  @Input() formControl: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  formControlValueChanges: Subscription;

  get startControl (): FormControl {
    return this.formControl.get('start') as FormControl;
  }

  get endControl (): FormControl {
    return this.formControl.get('end') as FormControl;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.value);
    this.listenToFormControlChanges();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if( changes.formControl ) {
      this.listenToFormControlChanges();
    }
  }

  writeValue( value: any, inputChange: boolean = false ): void {
    console.log('In this bit', value);
    this.value = value;

    if (JSON.stringify(value) !== JSON.stringify(this.formControl.value) && !inputChange) {
      this.formControl.patchValue(value, { emitEvent: false });
    }

    // On want to trigger on change if it is not a form control

    console.log(this.onChange);
    console.log({value});
    this.onChange?.(value);
  }

  openEndDatePicker( startDate: Moment ): void {
    this.endDatePicker.open();
    console.log(startDate);
    console.log(this.endDatePicker);
    this.endDatePicker.select(moment(startDate));
    setTimeout(() => {
      this.endDatePicker._applyPendingSelection();

    })
  }

  updateValue(event, area) {
    this.value = {
      ...this.value,
      [area]: event,
    }

    console.log(area);
    console.log(event);

    if ( area === 'start' ) {
      this.startDatePicker.close();
      this.openEndDatePicker(event);
    }

    console.log(this.value);
    if ( this.value.end && this.value.start ) {
      this.writeValue(this.value);
    }

  }

  listenToFormControlChanges (): void {
    this.formControlValueChanges?.unsubscribe();

    // this.formControlValueChanges = this.formControl
    //   .valueChanges
    //   .pipe(
    //     skipWhile((val) => !val.start || !val.end )
    //   )
    //   .subscribe({
    //     next: ( val ) => {

    //       this.writeValue(val, true);
    //       console.log(val);
    //     }
    //   });
  }
}
