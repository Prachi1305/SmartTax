import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { CommonService } from 'src/app/lib/services/common-service/common.service';
import { MASTERS_API_LIST } from '../masters-api';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyForm: FormGroup;
  verticalsList: any[] = [];
  stateList: any[] = [];
  statusList: any[] = [];
  submitted: boolean = false;
  isUpdate: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiHelper: ApiHelperService
  ) { }

  ngOnInit(): void {
    this.companyForm = this._formBuilder.group({
      ID: [0],
      CIN_NO: ['', Validators.required],
      NAME: ['', Validators.required],
      FORMER_NAME: [],
      SHORT_NAME: [],
      PAN: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      DATE_OF_INCORPORATION: ['', Validators.required],
      STATUS: ['', Validators.required],
      ADDRESS: [],
      CITY: [],
      STATE: ['', Validators.required],
      PIN: [],
      MOBILE_NO_1: [],
      MOBILE_NO_2: [],
      EMAIL_ID_1: [],
      EMAIL_ID_2: [],
      NATURE_OF_BUSINESS: [],
      INCOME_TAX_WARD: [],
      OTHER_CONTACT_PERSON: [],
      VERTICALS: ['', Validators.required]
    });

    this.GetDropdownList();

    var companyId = this._activatedRoute.snapshot.paramMap.get('Id');
    if (companyId != undefined) {
      this.isUpdate = true;
      this.GetCompanyMasterDetails(Number(companyId));
    }

  }

  get f() {
    return this.companyForm.controls;
  }

  InsertCompanyMaster() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }

    var CIN_NO = this.companyForm.get('CIN_NO')?.value;
    var PAN = this.companyForm.get('PAN')?.value;

    this._apiHelper.get('Company/ValidateCompany?CIN_NO=' + CIN_NO + '&PAN_NO=' + PAN).subscribe((res: any) => {
      if (res.Data == null) {
        this._apiHelper.post('Company/InsertCompanyMaster', this.companyForm.value).subscribe((res: any) => {
          if (res.responseCode == 200) {
            this._commonService.showSuccessMessage('Company Data Saved Successfully');
            this.Clear();
            this._router.navigateByUrl('/masters/company-list');
          }
        });
      }
      else {
        var data = res.Data;
        if (data.CIN_NO != null) {
          this._commonService.showErrorMsg(data.CIN_NO + ' This CIN No already exists!')
          this.companyForm.get('CIN_NO')?.setValue('');
        }
        else if (data.PAN != null) {
          this._commonService.showErrorMsg(data.PAN + ' This PAN already Exists');
          this.companyForm.get('PAN')?.setValue('');
        }
      }
    })

  }

  GetDropdownList() {
    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Verticals').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.verticalsList = res.Data;
      }
    })


    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'State').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.stateList = res.Data;
      }
    })

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Status').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.statusList = res.Data;
      }
    })
  }



  Clear() {
    this.companyForm.reset();
    this.companyForm.get('STATE')?.setValue('');
    this.companyForm.get('STATUS')?.setValue('');
    this.companyForm.get('VERTICALS')?.setValue('');
  }

  numericOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);

    if (!reg.test(input)) {
      event.preventDefault();
    }
    return true;
  }

  GetCompanyMasterDetails(Id: number) {
    this._apiHelper.get('Company/GetCompanyMasterDetails?&ID=' + Id).subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.companyForm.patchValue(res.Data);
        this.companyForm.get('DATE_OF_INCORPORATION')?.setValue(formatDate(res.Data.DATE_OF_INCORPORATION, 'yyyy-MM-dd', 'en'));
      }
    });
  }

  UpdateCompanyMaster() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }

    this._apiHelper.put('Company/UpdateCompany', this.companyForm.value)
      .subscribe((res: any) => {
        if (res.responseCode == 200) {
          this._commonService.showSuccessMessage('Company Master updated successfully !');
          this.Clear();
          this._router.navigateByUrl('/masters/company-list');
        }
      });
  }


}
