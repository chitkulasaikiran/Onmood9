import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestHomeComponent } from './guest-home.component';
import { SigninModule } from 'src/app/_common/signin/signin.module';
import { SigninComponent } from 'src/app/_common/signin/signin.component';
import { GuestHomeRoutingModule } from './guest-home.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GuestHomeComponent],
  imports: [
    CommonModule,
    GuestHomeRoutingModule,
    SigninModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GuestHomeModule { }
