import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './lib/components/error-pages/notfound/notfound.component';

const routes: Routes = [

  {
    path: "account",
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
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
