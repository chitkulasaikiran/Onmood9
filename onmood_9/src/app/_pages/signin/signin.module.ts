import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from "./signin.component";
import {RouterModule} from '@angular/router';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SigninComponent
  ]
})
export class SigninModule { }
