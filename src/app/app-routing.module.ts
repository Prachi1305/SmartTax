import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './lib/components/error-pages/notfound/notfound.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  {
    path: "account",
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'masters',
    loadChildren: () => import('./modules/masters/masters.module').then(m => m.MastersModule),
  },
  {
    path: 'assessment-year',
    loadChildren: () => import('./modules/assessment-year/assessment-year.module').then(m => m.AssessmentYearModule)
  },
  {
    path: 'other-forms',
    loadChildren: () => import('./modules/other-forms/other-forms.module').then(m => m.OtherFormsModule)
  },
    //Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    component: NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
