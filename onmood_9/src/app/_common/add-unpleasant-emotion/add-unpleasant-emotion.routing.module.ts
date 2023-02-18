import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUnpleasantEmotionComponent } from './add-unpleasant-emotion.component';


const routes: Routes = [
  {
    component: AddUnpleasantEmotionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUnpleasantEmotionModule { }