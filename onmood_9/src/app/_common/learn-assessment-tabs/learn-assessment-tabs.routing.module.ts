import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearnAssessmentTabsComponent } from "./learn-assessment-tabs.component";


const routes: Routes = [
  {
    path: '',
    component: LearnAssessmentTabsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnAssessmentTabsRoutingModule { }