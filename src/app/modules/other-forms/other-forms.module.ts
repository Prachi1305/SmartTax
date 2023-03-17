import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherFormsRoutingModule } from './other-forms-routing.module';
import { FormCertificateComponent } from './form-certificate/form-certificate.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormCertificateComponent
  ],
  imports: [
    CommonModule,
    OtherFormsRoutingModule,
    RouterModule,
    FormsModule ,  
    ReactiveFormsModule
  ]
})
export class OtherFormsModule { }
