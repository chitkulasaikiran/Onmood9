import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssessmentDetailsComponent } from "./assessment-details/assessment-details.component";
import { AssessmentHistoryComponent } from "./assessment-history/assessment-history.component";
import { AssessmentResultComponent } from "./assessment-result/assessment-result.component";
import { AssessmentTestComponent } from "./assessment-test/assessment-test.component";
import { AssessmentsListComponent } from "./assessments-list/assessments-list.component";

const routes: Routes = [
    {
        path: '',
        component: AssessmentsListComponent
    },
    {
        path:'details',
        component:AssessmentDetailsComponent
    },
    {
        path:'test',
        component:AssessmentTestComponent
    },
    {
        path:'history',
        component:AssessmentHistoryComponent
    }
            
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class assessmentsRoutingModule { }