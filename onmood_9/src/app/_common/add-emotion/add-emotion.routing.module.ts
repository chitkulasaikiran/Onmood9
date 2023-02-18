import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmotionComponent } from './add-emotion.component';


const routes: Routes = [
  {
    component: AddEmotionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEmotionRoutingModule { }