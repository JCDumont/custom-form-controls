import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-form-controls';
  test = new FormControl('Tester', Validators.compose([Validators.required]));

  testBlur = new FormControl('Tester', { updateOn: 'blur' });

  numberInput = new FormControl('123.4', Validators.compose([Validators.min(200)]));
  numberInputBlur = new FormControl('1234.4423', { updateOn: 'blur' });
  selectInput = new FormControl({
    value: 'Test',
    name: 'Test',
  });

  selectInputModel;

  multiSelectInputModel;

  numberModel = 123;

  textareaText = 'text area';

  dateInputControl = new Date();

  dateControl = new FormControl(new Date());


  sliderInput = 2;
  sliderControl = new FormControl(2);

  toggleInput = false;
  toggleControl = new FormControl(true);

  dateRangeInput = {
    start: new Date(),
    end: new Date(),
  };

  dateRangeControl = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });


  constructor() {

    setTimeout(() => {
      this.title = 'testeterer';
      this.test.setValue('Hey there!');
      this.testBlur.setValue('Blur update!');

      this.numberInput.setValue(123.2890347238947238947239847392874);
      this.numberInput.setErrors({invalid: true, minLength: 4});
      this.numberInputBlur.setValue(21323.2890347238947238947239847392874);

      this.test.disable();
      this.selectInput.disable();

      this.dateInputControl = new Date();
      this.dateControl.setValue(new Date());

      this.dateControl.disable();
    }, 5000);

    setTimeout(() => {
      this.test.enable();
      this.selectInput.enable();
    }, 10000);

    this.numberInputBlur.valueChanges
    .subscribe({
      next: ( val ) => {
        console.log(val);
      }
    });
  }
}
