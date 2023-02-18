import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddThoughtComponent } from "./add-thought.component";

@NgModule({
  declarations: [AddThoughtComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddThoughtComponent
  ]
})
export class AddThoughtModule { }
