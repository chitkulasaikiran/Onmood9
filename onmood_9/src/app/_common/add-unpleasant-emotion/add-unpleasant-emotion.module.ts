import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUnpleasantEmotionComponent } from "./add-unpleasant-emotion.component";

@NgModule({
  declarations: [AddUnpleasantEmotionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddUnpleasantEmotionComponent
  ]
})
export class AddUnpleasantEmotionModule { }
