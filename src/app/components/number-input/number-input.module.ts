import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberInputComponent } from './number-input.component';



@NgModule({
  declarations: [
    NumberInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NumberInputComponent,
  ]
})
export class NumberInputModule { }
