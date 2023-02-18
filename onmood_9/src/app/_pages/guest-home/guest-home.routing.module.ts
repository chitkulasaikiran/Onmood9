import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestHomeComponent } from './guest-home.component';


const routes: Routes = [
  {
    path: '',
    component: GuestHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestHomeRoutingModule { }