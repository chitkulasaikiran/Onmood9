import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioPlayComponent } from './audio-play.component';


const routes: Routes = [
  {
    path: '',
    component: AudioPlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioPlayRoutingModule { }