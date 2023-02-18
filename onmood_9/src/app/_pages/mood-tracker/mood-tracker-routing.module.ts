import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFeelingComponent } from './add-feeling/add-feeling.component';
import { MoodTrackerComponent } from './mood-tracker/mood-tracker.component';

const routes: Routes = [
    {
        path: '',
        component: MoodTrackerComponent
    },
    {
        path: 'addfeeling',
        component: AddFeelingComponent
    }
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})  
export class MoodTrackerRoutingModule { }
