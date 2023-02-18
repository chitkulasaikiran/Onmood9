import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddThoughtComponent } from './add-thought.component';


const routes: Routes = [
  {
    component: AddThoughtComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddToughtRoutingModule { }