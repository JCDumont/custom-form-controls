import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, Story } from '@storybook/angular';
import { DatePickerModule } from 'src/app/components/date-picker/date-picker.module';
import { FiveDayRangeSelectionStrategy, SelectedDateState } from 'src/app/components/date-range-input/new-date-range-input.component';
import { NewDateRangeInputModule } from 'src/app/components/date-range-input/new-date-range-input.module';
import { NumberInputModule } from 'src/app/components/number-input/number-input.module';
import { SelectInputModule } from 'src/app/components/select-input/select-input.module';
import { SliderInputModule } from 'src/app/components/slider-input/slider-input.module';
import { TextAreaModule } from 'src/app/components/text-area/text-area.module';
import { TextInputModule } from 'src/app/components/text-input/text-input.module';
import { ToggleSlideModule } from 'src/app/components/toggle-slide/toggle-slide.module';
import { LongFormComponent } from 'src/stories/playgrounds/long-form/long-form.component';


const fieldsToNotIncludeOptions = [ 'formControl', 'prefix', 'suffix', 'properties', 'inputValue', 'customerFormControl', 'onTouched', 'onChange' ]
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
  title: 'Playground/Form',
  component: LongFormComponent,
  argTypes: {
    ...fieldsToNotIncludeOptions,
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TextInputModule,
        TextAreaModule,
        ToggleSlideModule,
        SliderInputModule,
        SelectInputModule,
        NumberInputModule,
        NewDateRangeInputModule,
        DatePickerModule,
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

export const Default = Template.bind({});
Default.args = {};
