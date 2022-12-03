import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ReusableComponentsModule } from 'src/app/lib/components/reusable-components/reusable-components.module';
import { RegistrationComponent } from './registration/registration.component';





@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReusableComponentsModule
  ]
})
export class AccountModule { }
