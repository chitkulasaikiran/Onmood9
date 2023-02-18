import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmotionComponent } from "./add-emotion.component";

@NgModule({
  declarations: [AddEmotionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddEmotionComponent
  ]
})
export class AddEmotionModule { }
