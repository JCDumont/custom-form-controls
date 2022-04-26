import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-long-form',
  templateUrl: './long-form.component.html',
  styleUrls: ['./long-form.component.scss']
})
export class LongFormComponent implements OnInit {

  form = new FormGroup({
    textInput: new FormControl('Basic text input'),
    textInputOnBlur: new FormControl('Updates on blur', { updateOn: 'blur'} ),
    validatedText: new FormControl('Minimum length(5)', Validators.compose([Validators.minLength(5)]) ),
    numberInput: new FormControl(5),
    numberInputOnBlur: new FormControl('1.2345', { updateOn: 'blur' }),
    numberWithFormat: new FormControl('5.342123'),
    numberWithSuffix: new FormControl(1.23),
    numberWithPrefix: new FormControl(4.56),
    slider: new FormControl(10),
    textArea: new FormControl('Nice text area'),
    textAreaOnBlur: new FormControl('Text area on blur', { updateOn: 'blur' }),
    dateRange: new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    }),
  });

  dateThing = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  })
  constructor() { }

  ngOnInit(): void {

    this.form.valueChanges
      .subscribe({
        next: (val) => {
          console.log(val);
        }
      });
  }

  formInputColour = 200;

  updateFormInputColour ( number ): void {
    document.documentElement.style.setProperty('--hue', `${number}`);

  }

}
