import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { CommonService } from 'src/app/lib/services/common-service/common.service';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  submitted: boolean = false;
  userForm: FormGroup;
  companylist: any[] = [];
  isUpdate: boolean = false;
  userList: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _apiHelper: ApiHelperService,
    private _commonService: CommonService,
    private _layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      ID: [0],
      USERNAME: ['', Validators.required],
      PASSWORD: ['', Validators.required],
      EMPLOYEE_NAME: ['', Validators.required],
      EMPLOYEE_CODE: [],
      DESIGNATION: [],
      EMAIL: [],
      COMPANY_ID: ['', Validators.required],
      ROLE: [],
      STATUS: [false],
    });

    this.GetDropDown();

    this.GetUserList();
  }

  get f() {
    return this.userForm.controls;
  }

  GetDropDown() {

    this._apiHelper.get('Company/GetCompany').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.companylist = res.Data;
      }
    });

  }

  InserUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this._apiHelper.post('Account/InsertUser', this.userForm.value).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this._commonService.showSuccessMessage('User Created Successfully');
        this.GetUserList();
        this.Clear();
      }
    });
  }

  GetUserList() {
    this._apiHelper.get('Account/GetUserList').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.userList = res.Data;
      }
    });
  }

  GetUserDetails(Id: number) {
    this.isUpdate = true;
    this._apiHelper.get('Account/GetUserDetails?&ID=' + Id).subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.userForm.patchValue(res.Data);
      }
    });
  }

  UpdateUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this._apiHelper.put('Account/UpdateUser', this.userForm.value)
      .subscribe((res: any) => {
        if (res.responseCode == 200) {
          this._commonService.showSuccessMessage('Company Master updated successfully !');
          this.GetUserList();
          this.Clear();
        }
      });
  }

  deleteUser(Id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._apiHelper.delete('/api/Account/DeleteUser?ID=' + Id)
          .subscribe((res: any) => {
            if (res.ResponseCode == 200) {
              Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
              this.GetUserList();
            }
          });
      }
    });
  }

  Clear() {
    this.userForm.reset();
    this.userForm.get("COMPANY_ID")?.setValue('');
    this.isUpdate = false;
  }
  
  ngAfterContentInit(): void {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: true })
  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }





}
