import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AcuButtonComponent } from './acu-button.component';

@NgModule({
  declarations: [
    AcuButtonComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AcuButtonComponent,
  ]
})
export class AcuButtonModule { }
