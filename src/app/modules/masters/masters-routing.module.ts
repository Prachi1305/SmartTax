import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/lib/guards/auth-guard/auth-guard.guard';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyComponent } from './company/company.component';
import { SystemTypeComponent } from './system-type/system-type.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    //canActivate:[AuthGuardGuard]
  },
  {
    path: 'system-type',
    component: SystemTypeComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'company-list',
    component: CompanyListComponent,
    //canActivate:[AuthGuardGuard]
  },
  {
    path: 'company/:Id',
    component: CompanyComponent,
    canActivate:[AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
