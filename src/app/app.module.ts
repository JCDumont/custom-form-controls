import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from 'src/app/components/date-picker/date-picker.module';
import { DateRangeInputModule } from 'src/app/components/date-range-input/date-range-input.module';
import { NumberInputModule } from 'src/app/components/number-input/number-input.module';
import { SelectInputModule } from 'src/app/components/select-input/select-input.module';
import { SliderInputModule } from 'src/app/components/slider-input/slider-input.module';
import { TextAreaModule } from 'src/app/components/text-area/text-area.module';
import { TextInputModule } from 'src/app/components/text-input/text-input.module';
import { ToggleSlideModule } from 'src/app/components/toggle-slide/toggle-slide.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputModule,
    NumberInputModule,
    SelectInputModule,
    TextAreaModule,
    DatePickerModule,
    SliderInputModule,
    ToggleSlideModule,
    DateRangeInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
