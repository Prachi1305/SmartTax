import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentYearRoutingModule } from './assessment-year-routing.module';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentYearComponent } from './assessment-year/assessment-year.component';
import { AccountAuditIssueComponent } from './account-audit-issue/account-audit-issue.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { AuthGuardGuard } from 'src/app/lib/guards/auth-guard/auth-guard.guard';


@NgModule({
  declarations: [
    UserLandingComponent,
    AssessmentYearComponent,
    AccountAuditIssueComponent,
    BalanceSheetComponent
  ],
  imports: [
    CommonModule,
    AssessmentYearRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class AssessmentYearModule { }
