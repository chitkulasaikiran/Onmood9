import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AssessmentsListComponent } from './assessments-list/assessments-list.component';
import { assessmentsRoutingModule } from './assessments.routing.module';
import { RouterModule } from '@angular/router';
import { AssessmentDetailsComponent } from './assessment-details/assessment-details.component';
import { AssessmentTestComponent } from './assessment-test/assessment-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentResultComponent } from './assessment-result/assessment-result.component';
import { AssessmentHistoryComponent } from './assessment-history/assessment-history.component';
import { LearnAssessmentTabsModule } from "../../_common/learn-assessment-tabs/learn-assessment-tabs.module";
@NgModule({
  declarations: [AssessmentsListComponent,
    AssessmentDetailsComponent,
    AssessmentTestComponent,
    AssessmentResultComponent,AssessmentHistoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    assessmentsRoutingModule,
    LearnAssessmentTabsModule
  ],
  exports:[
    AssessmentsListComponent,
    AssessmentDetailsComponent,
    AssessmentTestComponent,
    AssessmentResultComponent,AssessmentHistoryComponent
  ],
  providers:[DatePipe]
})
export class AssessmentsModule { }
