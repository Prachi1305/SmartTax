import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { StorageService } from 'src/app/lib/services/storage-service/storage.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {

  companylist: any[] = [];
  assessmentYearList: any[] = [];
  landingForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _apiHelper: ApiHelperService,
    private _enc :StorageService
  ) { }

  ngOnInit(): void {
   
    this.landingForm = this._formBuilder.group({
      COMPANY_ID: ['', [Validators.required]],
      ASSESSMENT_YEAR: ['', [Validators.required]],
    })
    this.GetDropDown();
  }

  GetDropDown() {

    this._apiHelper.get('Company/GetCompany').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.companylist = res.Data;
      }
    });

  }

  getAssYear(event: any) {
    this.assessmentYearList = [];
    this.landingForm.get("ASSESSMENT_YEAR")?.reset();
    localStorage.removeItem('companyYear');

    this._apiHelper.get('AssessmentYear/GetAssYearByCompanyId?CompanyID=' + event.target.value).subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.assessmentYearList = res.Data;
      }
    });
  }

  AddUpdateAssYear() {
    this.submitted = true;

    if (this.landingForm.invalid) {
      return;
    }

    var companyId = this.landingForm.get('COMPANY_ID')?.value;
    var assessment_year = this.landingForm.get('ASSESSMENT_YEAR')?.value;

    if (companyId != "" && assessment_year == "") {
      this._router.navigateByUrl('/assessment-year/assessment-year/' + companyId);
    }
    else if (companyId != "" && assessment_year != "") {
      this._router.navigateByUrl('/assessment-year/assessment-year/' + companyId + '/' + assessment_year);
    }

  }

  get f() {
    return this.landingForm.controls;
  }

  onSubmit() {
    debugger
    // this.landingForm.get('ASSESSMENT_YEAR')?.setValidators([Validators.required]);
    // this.landingForm.get('ASSESSMENT_YEAR')?.updateValueAndValidity();

    this.submitted = true;

    if (this.landingForm.valid) {
      this._enc.setLocalStorageItem('companyYear', JSON.stringify(this.landingForm.value));
      this._router.navigateByUrl('/assessment-year/account-audit-issue');
  
    }
    else{
      return;
    }

   
  }

  logout() {  
    localStorage.removeItem('currentUser');
    localStorage.removeItem('companyYear'); 
    this._router.navigate(['/account/login']);  
  }  


}
