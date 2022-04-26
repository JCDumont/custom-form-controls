import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'src/app/components/date-picker/date-picker.module';
import { NewDateRangeInputModule } from 'src/app/components/new-date-range-input/new-date-range-input.module';
import { NumberInputModule } from 'src/app/components/number-input/number-input.module';
import { SelectInputModule } from 'src/app/components/select-input/select-input.module';
import { SliderInputModule } from 'src/app/components/slider-input/slider-input.module';
import { TextAreaModule } from 'src/app/components/text-area/text-area.module';
import { TextInputModule } from 'src/app/components/text-input/text-input.module';
import { ToggleSlideModule } from 'src/app/components/toggle-slide/toggle-slide.module';
import { LongFormComponent } from './long-form.component';



@NgModule({
  declarations: [
    LongFormComponent
  ],
  imports: [
    CommonModule,
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
  exports: [
    LongFormComponent,
  ]
})
export class LongFormModule { }
