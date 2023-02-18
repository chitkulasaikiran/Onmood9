import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserHomeComponent } from './user-home.component';


const routes: Routes = [
  {
    path: 'user-home',
    component: UserHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHomeRoutingModule { }