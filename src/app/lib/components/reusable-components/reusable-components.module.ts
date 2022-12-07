import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[TableComponent,FormComponent]
})
export class ReusableComponentsModule { }
