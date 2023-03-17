import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ReusableComponentsModule } from 'src/app/lib/components/reusable-components/reusable-components.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReusableComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
