import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from "./privacy.routing.module";

@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrivacyRoutingModule
  ]
})
export class PrivacyModule { }
