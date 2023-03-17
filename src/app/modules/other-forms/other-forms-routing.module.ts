import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCertificateComponent } from './form-certificate/form-certificate.component';

const routes: Routes = [
  {
    path: 'form-281',
    component: FormCertificateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherFormsRoutingModule { }
