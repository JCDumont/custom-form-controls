import { Component, forwardRef, Injectable, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatDateRangePicker, MatDateRangeSelectionStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import * as moment from 'moment';
import { CustomFormControl } from 'src/app/components/base/base-form-input';

@Injectable()
export class SelectedDateState {
  dateValue: any = {};

  selectedInput: 'start' | 'end' = 'start';

  updateFormValue: ( value ) => void;

  setSelectedInput ( area ): void {
    this.selectedInput = area;
  }

  setUpdateFormValue( fn) {
    this.updateFormValue = fn;
  }
  setDateValue ( dateValue ): void {
    this.dateValue = {
      start: dateValue.start ? moment(dateValue.start ) : undefined,
      end: dateValue.end ? moment(dateValue.end) : undefined
    }
  }
}


@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {

  constructor(
    private _dateAdapter: DateAdapter<D>,
    private selectedDateState: SelectedDateState
  ) {}

  selectionFinished(date: D | null): DateRange<D> {
    this.selectedDateState.updateFormValue?.(this.createRange(date));
    return this.createRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this.createRange(activeDate);
  }

  private createRange (date: D | null): DateRange<D>  {

    let { start, end } = this.selectedDateState.dateValue;

    if( date ) {
      if ( this.selectedDateState.selectedInput === 'start' ) {
        if ( !end ) {
          end = date;
        }
        return new DateRange<D>(date, end);
      } else {
        if ( !end ) {
          start = date;
        }
        return new DateRange<D>(start, date);
      }
    }

    return new DateRange<D>( start, end );
  }
}


@Component({
  selector: 'app-new-date-range-input',
  templateUrl: './new-date-range-input.component.html',
  styleUrls: ['./new-date-range-input.component.scss'],
  providers: [
    SelectedDateState,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NewDateRangeInputComponent)
    },
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ]
})
export class NewDateRangeInputComponent extends CustomFormControl implements OnChanges, ControlValueAccessor {
  readonly secondFormId: string = `${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}`;

  // Date range references
  @ViewChild( 'picker', { static: false }) startDatePicker: MatDateRangePicker<any>;
  @ViewChild( 'picker2', { static: false }) endDatePicker: MatDateRangePicker<any>;

  @Input() formControl: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  get startControl (): FormControl {
    return this.formControl.get('start') as FormControl;
  }

  get endControl (): FormControl {
    return this.formControl.get('end') as FormControl;
  }

  secondInputFocus: boolean = false;

  constructor(
    private selectionStrategy: FiveDayRangeSelectionStrategy<DateRange<Date>>,
    private selectedDateState: SelectedDateState,
  ) {
    super();
    this.selectedDateState.setUpdateFormValue(this.handleDateRangeInputUpdate.bind(this));
    this.stubUnusedFormGroupFunctions();
  }

  handleDateRangeInputUpdate ( dateRange ): void {
    this.writeValue(dateRange)
    this.validateDateSelection(dateRange);
  }

  stubUnusedFormGroupFunctions (): void {
    const keysToStub = [
      'registerOnChange',
      'registerOnDisabledChange',
      '_unregisterOnChange',
      '_unregisterOnDisabledChange'
     ];

    keysToStub.forEach(
      (key) => this.formControl[key] = () => {}
    );
  }

  ngOnChanges ( changes: SimpleChanges): void {
    if ( changes.formControl ) {
      this.customFormControl = true;
      this.stubUnusedFormGroupFunctions();
    }
  }

  openInput ( area: 'start' | 'end', dateRangeReference ): void {
    this.selectedDateState.setDateValue(this.formControl.getRawValue());
    this.selectedDateState.setSelectedInput(area);

    if ( this.formControl.get(area).disabled ) {
      return;
    }

    dateRangeReference.open();
  }

  writtenInputUpdate(newDate, area): void {
    if ( !moment(newDate, 'dd/MM/yyyy').isValid() ) {
      return;
    }

    const [ days, month, year] = newDate.split('/');

    const date = new Date();
    date.setDate(days);
    date.setMonth(month - 1);
    date.setFullYear(year);
    date.setHours(0, 0, 0, 0);

    const updatedValue = {
      ...this.formControl.getRawValue(),
      [area]: moment(date).utc(),
    }
    // this.formControl.get(area).setValue(moment(date).utc(), { emitEvent: false });
    this.writeValue(updatedValue);
  }

  validateDateSelection ( dateRange ): void {
    if ( moment(dateRange.start).isSameOrBefore(dateRange.end)) {
      return;
    }

    this.formControl.setErrors({ startAfterEnd: true });
  }

  writeValue( value: any, inputChange: boolean = false ): void {
    this.value = value;

    if (JSON.stringify(value) !== JSON.stringify(this.formControl.value) && !inputChange) {
      this.formControl.patchValue(value);
    }

    this.validateDateSelection(value);

    // On want to trigger on change if it is not a form control
    if ( !this.customFormControl ) {
      this.onChange?.(value);
    }
  }
}
