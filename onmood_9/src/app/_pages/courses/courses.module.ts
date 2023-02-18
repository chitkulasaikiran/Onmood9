import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { IvyCarouselModule } from '../carousel/carousel.module';
import { CourseComponent } from './course/course.component';
import { AssessmentsModule } from '../assessments/assessments.module';
import { LearnAssessmentTabsModule } from 'src/app/_common/learn-assessment-tabs/learn-assessment-tabs.module';
import { CourseGroupComponent } from './course-group/course-group.component';
import { CourseGroupModuleComponent } from './course-group-module/course-group-module.component';
import { CourseGroupModuleSessionComponent } from './course-group-module-session/course-group-module-session.component';
import { SafeHtmlPipe } from './SafeHtmlPipe';
import { SessionPlayIconComponent } from 'src/app/_common/session-play-icon/session-play-icon.component';
import { AudioPlayModule } from '../audio-play/audio-play.module';


@NgModule({
  declarations: [
    CourseComponent,
    CourseGroupComponent,
    CourseGroupModuleComponent,
    CourseGroupModuleSessionComponent,
    SessionPlayIconComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    IvyCarouselModule,
    AudioPlayModule, 
    AssessmentsModule,
    LearnAssessmentTabsModule  
  ]
})
export class CoursesModule { }
