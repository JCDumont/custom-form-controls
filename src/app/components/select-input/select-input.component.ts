import { Component, forwardRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class SelectInputComponent extends CustomFormControl implements OnInit, ControlValueAccessor {

  @Input() multiSelect: boolean = false;

  options = [
    {
      value: 'Test',
      name: 'Test',
    },
    {
      value: 'Test2',
      name: 'Test2',
    },
    {
      value: 'Test3',
      name: 'Test4',
    },
    {
      value: 'Test4',
      name: 'Test4',
    },
    {
      value: 'Test5',
      name: 'Test5',
    },
    {
      value: 'Test6',
      name: 'Test6',
    },
    {
      value: 'Test7',
      name: 'Test7',
    }
  ]
  constructor() {
    super();
   }

  ngOnInit(): void {

  }

  log(select) {
    console.log(select);
  }

}
