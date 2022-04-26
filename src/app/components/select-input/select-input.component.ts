import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownPosition, NgSelectComponent } from '@ng-select/ng-select';
import { CustomFormControl } from 'src/app/components/base/base-form-input';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectInputComponent)
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SelectInputComponent extends CustomFormControl implements OnInit, OnChanges, ControlValueAccessor {

  @ViewChild( 'select', { static: false }) selectReference: NgSelectComponent;

  // Display based variables
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'description';
  @Input() showRemoveIcon: boolean = false;
  @Input() templateName: string;
  @Input() closeDropdownOnSelect: boolean = true;
  @Input() labelFormatter: ( item: any ) => string;

  // Grouping handlers
  @Input() groupedList: boolean = false;
  @Input() groupName: string;
  @Input() groupByFn: (value) => string;
  @Input() groupValueFn: (string) => string = (groupHeading: string) => {
    return groupHeading;
  }

  // Input method variables
  @Input() multiSelect: boolean = false;
  @Input() checkBoxSelect: boolean = false;
  @Input() clearable: boolean = true;
  @Input() useFirstValueAsDefault: boolean = false;

  // Dropdown impacting variables
  @Input() dropdownPosition: DropdownPosition = 'auto';
  @Input() dropdownWidth: string;
  @Input() selectOptions: any[] = [];

  // Outputs
  @Output() removeRow: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  ngOnInit (): void {
    this.checkIfDefaultNeedsSetting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes.selectOptions ) {
      this.validateSelectionsExistInList();
      this.checkIfDefaultNeedsSetting();
    }
  }

  validateSelectionsExistInList (): void {
    if ( !this.formControl.value || !this.selectOptions || this.selectOptions?.length === 0 ) return;

    const optionChecker = ( value ) => this.selectOptions.find(option => {
      const optionValue = this.bindValue ? option[this.bindValue] : option;
      return JSON.stringify(optionValue) === JSON.stringify(value);
    });

    if ( this.multiSelect ) {
      const filteredValue = this.formControl.value
        .filter((value) =>{
          return optionChecker(value);
        });

      if ( filteredValue.length !== this.formControl.value.length ) {
        this.formControl.setValue(filteredValue);
      }

      return;
    } else {
      const validOption = optionChecker(this.formControl.value);

      if ( !validOption ) {
        this.formControl.setValue(undefined);
      }
    }
  }

  checkIfDefaultNeedsSetting (): void {
    if (
      this.useFirstValueAsDefault
      && this.selectOptions?.length
      && (!this.formControl.value || this.formControl.value.length === 0)
    ) {
      this.defaultValue = this.selectOptions[0];
      this.value = this.multiSelect ? [this.defaultValue] : this.defaultValue;
      this.formControl.setValue(this.value);
    }
  }

  onBlur(): void {
    this.focused = false;
    const noValue = this.value === ''
     || this.value === undefined
     || this.value === null
     || this.value?.length === 0;

    if ( noValue && this.defaultValue !== undefined  ) {
      this.value = this.multiSelect ? [this.defaultValue] : this.defaultValue;
      this.formControl.setValue(this.value);
    }
  }

  openSelectMenu (): void {
    if ( this.selectReference?.isOpen ) {
      this.selectReference.close();
    } else {
      this.selectReference.open();
    }
  }

  handleUserSearch (): void {
    const dropdownId: string = this.selectReference.dropdownId;
    const dropdownPanel: HTMLElement = document.getElementById(dropdownId);

    if ( dropdownPanel ) {
      dropdownPanel.scrollTop = 0;
    }
  }

  handleOpen(): void {
    if ( !this.dropdownWidth ) {
      return;
    }

    // SetTimeout required so that the ng-select has rendered!
    setTimeout(() => {
      const dropdownId: string = this.selectReference.dropdownId;
      const dropdownPanel: HTMLElement = document.getElementById(dropdownId);
      dropdownPanel.style.width = this.dropdownWidth;
    });
  }

}
