import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeRoutingModule } from "./user-home.routing.module";
import { UserHomeComponent } from './user-home.component';
import { IvyCarouselModule } from '../carousel/carousel.module';

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    UserHomeRoutingModule
  ]
})
export class UserHomeModule { }
