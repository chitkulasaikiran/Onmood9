import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayComponent } from "./audio-play.component";
import {RouterModule} from '@angular/router';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { NgCircleProgressModule } from 'ng-circle-progress';

import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [AudioPlayComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Specify ng-circle-progress as an import
    // NgCircleProgressModule.forRoot({}),
    RoundProgressModule
  ],
  exports: [
    AudioPlayComponent
  ]
})
export class AudioPlayModule { }
