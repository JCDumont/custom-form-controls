import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToggleSlideComponent } from './toggle-slide.component';



@NgModule({
  declarations: [
    ToggleSlideComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  exports: [
    ToggleSlideComponent,
  ]
})
export class ToggleSlideModule { }
