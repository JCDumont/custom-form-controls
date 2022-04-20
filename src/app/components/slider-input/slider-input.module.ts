import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { SliderInputComponent } from './slider-input.component';



@NgModule({
  declarations: [
    SliderInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
  ],
  exports: [
    SliderInputComponent,
  ]
})
export class SliderInputModule { }
