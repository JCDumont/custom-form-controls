import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectInputComponent } from './select-input.component';



@NgModule({
  declarations: [
    SelectInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatTooltipModule,
  ],
  exports: [
    SelectInputComponent,
  ]
})
export class SelectInputModule { }
