import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordRoutingModule } from "./forgot-password.routing.module";
import { ForgotPasswordComponent } from './forgot-password.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
