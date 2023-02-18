import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoodTrackerComponent } from './mood-tracker/mood-tracker.component';
import { AddFeelingComponent } from './add-feeling/add-feeling.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoodTrackerRoutingModule } from './mood-tracker-routing.module';
import { AddEmotionModule } from 'src/app/_common/add-emotion/add-emotion.module';
import { AddUnpleasantEmotionModule } from 'src/app/_common/add-unpleasant-emotion/add-unpleasant-emotion.module';
import { AddThoughtModule } from 'src/app/_common/add-thought/add-thought.module';
import { GoogleChartsModule } from 'angular-google-charts';



@NgModule({
  declarations: [
    MoodTrackerComponent,
    AddFeelingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoodTrackerRoutingModule,
    GoogleChartsModule,
    AddEmotionModule,
    AddUnpleasantEmotionModule,
    AddThoughtModule
  ]
})
export class MoodTrackerModule { }
