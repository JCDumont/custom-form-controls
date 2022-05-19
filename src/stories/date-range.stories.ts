import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, Story } from '@storybook/angular';
import { FiveDayRangeSelectionStrategy, NewDateRangeInputComponent, SelectedDateState } from 'src/app/components/date-range-input/new-date-range-input.component';


const fieldsToNotIncludeOptions = [ 'random', 'formControl', 'prefix', 'suffix', 'properties', 'inputValue', 'customerFormControl', 'onTouched', 'onChange' ]
  .reduce((a, b) => {
    return {
      ...a,
      [b]: {
        table: {
          disable: true,
        }
      }
    }
  }, {});

export default {
  title: 'Form elements/Date range picker component',
  component: NewDateRangeInputComponent,
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    suffix: {
      control: { type: 'text' }
    },
    prefix: {
      control: { type: 'text' }
    },
    value: {
      control: {
        type: 'number'
      }
    },
    fieldDisabledOverride: {
      control: { type: 'boolean' }
    },
    submitAttempt: {
      control: { type: 'boolean' }
    },
    ...fieldsToNotIncludeOptions,
  },
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule
      ],
      providers: [
        SelectedDateState,
        FiveDayRangeSelectionStrategy,
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
      ]
    })
  ],
};

const Template: Story = ( args ) => ({
   props: args,
});

const form = new FormGroup({
  start: new FormControl(new Date()),
  end: new FormControl(new Date()),
});


form.valueChanges
  .subscribe({
    next: ( value ) => {
      console.log(value);
    }
  });

export const Default = Template.bind({});
Default.args = {
  label: 'Date input',
  debug: true,
  formControl: form,
}


const formDisabledEnd = new FormGroup({
  start: new FormControl(new Date()),
  end: new FormControl(new Date(), ),
});

formDisabledEnd.get('end').disable();

export const DisabledEnd = Template.bind({});
DisabledEnd.args = {
  label: 'Date input',
  debug: true,
  formControl: formDisabledEnd,
}

const startDisabled = new FormGroup({
  start: new FormControl(new Date()),
  end: new FormControl(new Date(), ),
});

startDisabled.get('start').disable();

export const DisabledStart = Template.bind({});
DisabledStart.args = {
  label: 'Date input',
  debug: true,
  formControl: startDisabled,
}

const noValue = new FormGroup({
  start: new FormControl(),
  end: new FormControl(),
});

export const NoValue = Template.bind({});
NoValue.args = {
  label: 'Date input',
  debug: true,
  formControl: noValue,
}
