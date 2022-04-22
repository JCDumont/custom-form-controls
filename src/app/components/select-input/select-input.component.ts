import { Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class SelectInputComponent extends CustomFormControl implements ControlValueAccessor {

  @ViewChild( 'select', { static: false }) selectReference: NgSelectComponent;


  @Input() selectOptions: any[] = [];

  // Input method variables
  @Input() multiSelect: boolean = false;
  @Input() clearable: boolean = true;


  // Dropdown impacting variables
  @Input() dropdownPosition: DropdownPosition = 'auto';
  @Input() dropdownWidth: string;


  // options = [
  //   {
  //     value: 'Test',
  //     name: 'Test',
  //   },
  //   {
  //     value: 'Test2',
  //     name: 'Test2',
  //   },
  //   {
  //     value: 'Test3',
  //     name: 'Test4',
  //   },
  //   {
  //     value: 'Test4',
  //     name: 'Test4',
  //   },
  //   {
  //     value: 'Test5',
  //     name: 'Test5',
  //   },
  //   {
  //     value: 'Test6',
  //     name: 'Test6',
  //   },
  //   {
  //     value: 'Test7',
  //     name: 'Test7',
  //   }
  // ]
  constructor() {
    super();
   }

  log(select) {
    console.log(select);
  }

  handleOpen(): void {

    if ( !this.dropdownWidth ) {
      return;
    }

    // Settimeout required so that the ng-select has rendered!
    setTimeout(() => {
      const dropdownPanel = document.getElementsByClassName('ng-dropdown-panel')[0] as any;
      dropdownPanel.style.width = this.dropdownWidth;
    });
  }

}
