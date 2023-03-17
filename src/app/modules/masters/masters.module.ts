import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { CompanyComponent } from './company/company.component';
import { SystemTypeComponent } from './system-type/system-type.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyListComponent } from './company-list/company-list.component';
import { ReusableComponentsModule } from 'src/app/lib/components/reusable-components/reusable-components.module';


@NgModule({
  declarations: [
    CompanyComponent,
    SystemTypeComponent,
    CompanyListComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    RouterModule,
    FormsModule ,  
    ReactiveFormsModule,
    ReusableComponentsModule
  ]
})
export class MastersModule { }
