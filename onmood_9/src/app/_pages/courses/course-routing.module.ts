import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard'; 
import { CourseGroupModuleSessionComponent } from './course-group-module-session/course-group-module-session.component';
import { CourseGroupModuleComponent } from './course-group-module/course-group-module.component';
import { CourseGroupComponent } from './course-group/course-group.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
	{path: ":category-id/courses", component: CourseComponent, canActivate: [AuthGuard]},
	{path: ":category-id/course/:course-id/groups", component: CourseGroupComponent, canActivate: [AuthGuard]},
	{path: ":category-id/course/:course-id/group/:group-id/modules", component: CourseGroupModuleComponent, canActivate: [AuthGuard]},
	{path: ":category-id/course/:course-id/group/:group-id/module/:module-id/sessions", component: CourseGroupModuleSessionComponent, canActivate: [AuthGuard]},
	
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})  
export class CourseRoutingModule { }
