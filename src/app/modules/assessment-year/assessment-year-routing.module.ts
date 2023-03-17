import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/lib/guards/auth-guard/auth-guard.guard';
import { AccountAuditIssueComponent } from './account-audit-issue/account-audit-issue.component';
import { AssessmentYearComponent } from './assessment-year/assessment-year.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

const routes: Routes = [
  {
    path: 'user-landing',
    component: UserLandingComponent,
    canActivate:[AuthGuardGuard],
    data: {  
      title: 'UserLanding'   
    } 
  },
  {
    path: 'assessment-year',
    component: AssessmentYearComponent,
  },
  {
    path: 'assessment-year/:companyId',
    component: AssessmentYearComponent,
  },
  {
    path: 'assessment-year/:companyId/:assessment_year',
    component: AssessmentYearComponent,
  },
  {
    path: 'account-audit-issue',
    component: AccountAuditIssueComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'balance-sheet',
    component: BalanceSheetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentYearRoutingModule { }
