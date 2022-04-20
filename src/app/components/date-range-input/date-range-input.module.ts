import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateRangeInputComponent } from './date-range-input.component';



@NgModule({
  declarations: [
    DateRangeInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  exports: [
    DateRangeInputComponent,
  ]
})
export class DateRangeInputModule { }
