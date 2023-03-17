import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { CommonService } from 'src/app/lib/services/common-service/common.service';
import { StorageService } from 'src/app/lib/services/storage-service/storage.service';
import Swal from 'sweetalert2';
import { MASTERS_API_LIST } from '../../masters/masters-api';

@Component({
  selector: 'app-account-audit-issue',
  templateUrl: './account-audit-issue.component.html',
  styleUrls: ['./account-audit-issue.component.css']
})
export class AccountAuditIssueComponent implements OnInit {

  auditIssueList: any[] = [];
  issueForm: FormGroup;
  submitted: boolean = false;
  isUpdate: boolean = false;
  auditorList: any[] = [];
  statusList: any[] = [];
  severityList: any[] = [];

  @ViewChild('openModalPopup') openModalPopup: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiHelper: ApiHelperService,
    private _commonService: CommonService,
    private _enc: StorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('companyYear')) {
      this._router.navigate(["/assessment-year/user-landing"]);
    }
    this.issueForm = this._formBuilder.group({
      ID: [0],
      COMPANY_ID: [],
      ASSESSMENT_YEAR: [''],
      ISSUE: ['', Validators.required],
      RAISED_DATE: [],
      DUE_DATE: ['', Validators.required],
      STATUS: [''],
      SEVERITY: [''],
      RESOLUTION: [''],
      CLOSURE_DATE: []
    })
    this.GetAuditIssueList();
  }

  openModal(ID: any = 0) {
    this.submitted = false;
    this.isUpdate = false;
    this.ClearForm();
    this.getDropdown();

    if (ID > 0) {
      this.isUpdate = true;
      this.GetDetails(ID);
    }

    this.openModalPopup.nativeElement.click();
  }

  get f() {
    return this.issueForm.controls;
  }

  GetDetails(ID: number) {
    this._apiHelper.get('AuditIssue/GetDetails?ID=' + ID)
      .subscribe((res: any) => {
        if (res.ResponseCode == 200) {
          this.issueForm.patchValue(res.Data);

          this.issueForm.get('RAISED_DATE')?.setValue(formatDate(res.Data.RAISED_DATE, 'yyyy-MM-dd', 'en'));
          this.issueForm.get('DUE_DATE')?.setValue(formatDate(res.Data.DUE_DATE, 'yyyy-MM-dd', 'en'));
          this.issueForm.get('CLOSURE_DATE')?.setValue(formatDate(res.Data.CLOSURE_DATE, 'yyyy-MM-dd', 'en'));
        }
      });
  }

  GetAuditIssueList() {
    this._apiHelper.get('AuditIssue/GetAuditList')
      .subscribe((res: any) => {
        if (res.ResponseCode == 200) {
          this.auditIssueList = res.Data;
        }
      });
  }

  InsertAudit() {
    this.submitted = true;

    if (this.issueForm.invalid) {
      return;
    }
    var data = this._enc.getLocalStorageItem('companyYear')
    if (data) {

      var companyYr = JSON.parse(data);
    }
    this.issueForm.get('COMPANY_ID')?.setValue(companyYr.COMPANY_ID);
    this.issueForm.get('ASSESSMENT_YEAR')?.setValue(companyYr.ASSESSMENT_YEAR);

    this._apiHelper
      .post('AuditIssue/InsertAudit', this.issueForm.value)
      .subscribe((res: any) => {
        if (res.responseCode == 200) {
          this._commonService.showSuccessMessage('Account Audit Issue Saved Successfully');
          this.GetAuditIssueList();
          this.closeBtn.nativeElement.click();
        }
      });
  }

  ClearForm() {
    this.issueForm.get('ISSUE')?.setValue('');
    this.issueForm.get('RAISED_DATE')?.setValue(null);
    this.issueForm.get('DUE_DATE')?.setValue(null);
    this.issueForm.get('STATUS')?.setValue('');
    this.issueForm.get('SEVERITY')?.setValue('');
    this.issueForm.get('RESOLUTION')?.setValue('');
    this.issueForm.get('CLOSURE_DATE')?.setValue(null);
  }

  getDropdown() {
    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Status').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.statusList = res.Data;
      }
    });

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Severity').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.severityList = res.Data;
      }
    });

  }

  updateAccountAuditIssue() {
    this.submitted = true;
    if (this.issueForm.invalid) {
      return;
    }

    var companyId = localStorage.getItem('COMPANY_ID');
    this.issueForm.get('COMPANY_ID')?.setValue(companyId);
    var assYear = localStorage.getItem('ASSESSMENT_YEAR');
    this.issueForm.get('ASSESSMENT_YEAR')?.setValue(assYear);

    this._apiHelper.put('AuditIssue/UpdateAuditIssue', this.issueForm.value)
      .subscribe((res: any) => {
        if (res.responseCode == 200) {
          this._commonService.showSuccessMessage('Account Audit Issue updated successfully !');
          this.ClearForm();
          this.GetAuditIssueList();
          this.closeBtn.nativeElement.click();
        }
      });
  }

  deleteAccountAudit(ID: number) {

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
        this._apiHelper.delete('AuditIssue/DeleteAuditIssue?ID=' + ID)
          .subscribe((res: any) => {
            if (res.ResponseCode == 200) {
              this.auditIssueList = res.Data;

              Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
              this.GetAuditIssueList();
            }
          });
      }
    });
  }

}
