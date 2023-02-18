import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnAssessmentTabsComponent } from "./learn-assessment-tabs.component";
import { LearnAssessmentTabsRoutingModule } from "./learn-assessment-tabs.routing.module";
import {RouterModule} from '@angular/router';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LearnAssessmentTabsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LearnAssessmentTabsComponent
  ]
})
export class LearnAssessmentTabsModule { }
