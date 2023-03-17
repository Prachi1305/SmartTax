import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { CommonService } from 'src/app/lib/services/common-service/common.service';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';
import { MASTERS_API_LIST } from '../../masters/masters-api';

@Component({
  selector: 'app-assessment-year',
  templateUrl: './assessment-year.component.html',
  styleUrls: ['./assessment-year.component.css']
})
export class AssessmentYearComponent implements OnInit {

  submitted: boolean = false;
  assessmentForm: FormGroup;
  isTaxAudit: boolean = false;
  isTransferPricing: boolean = false;
  isMasterFiling: boolean = false;
  companylist: any[] = [];
  assessmentYearList: any[] = [];
  auditorList: any[] = [];
  CEOList: any[] = [];
  CFOList: any[] = [];
  bankerList: any[] = [];
  directorList: any[] = [];
  isUpdate: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _commonService: CommonService,
    private _apiHelper: ApiHelperService,
    private _layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.assessmentForm = this._formBuilder.group({
      COMPANY_ID: ['', Validators.required],
      ASSESSMENT_YEAR: ['', Validators.required],
      NAME_OF_AUDITOR: new FormArray([]),
      CEO: new FormArray([]),
      CFO: new FormArray([]),
      MAIN_BANKER: new FormArray([]),
      DIRECTOR: new FormArray([]),
      IS_TAX_AUDIT: [false],
      IS_TRANSFER_PRICING: [false],
      IS_MASTER_FILING: [false],
      TA_DUE_DATE: [],
      TP_DUE_DATE: [],
      MF_DUE_DATE: [],
    })

    this.addAuditor();
    this.addCEO();
    this.addCFO();
    this.addMainBanker();
    this.addDirector();

    this.getDropdown();

    var companyId = this._activatedRoute.snapshot.paramMap.get('companyId');
    var ass_year = this._activatedRoute.snapshot.paramMap.get('assessment_year');
    if (companyId != undefined && ass_year != undefined) {
      this.isUpdate = true;
      this.GetAssessmentYearDetails(Number(companyId), ass_year);
    }
    else if (companyId != undefined) {
      this.assessmentForm.get('COMPANY_ID')?.setValue(Number(companyId));
    }
  }

  addAuditor() {
    const add = this.assessmentForm.get("NAME_OF_AUDITOR") as FormArray

    add.push(this._formBuilder.group({
      CATEGORY: ['Name of Auditor'],
      NAME: ['', Validators.required],
      FROM_DATE: ['', Validators.required],
      TO_DATE: ['', Validators.required]
    }))

  }

  addCEO() {
    const add = this.assessmentForm.get("CEO") as FormArray

    add.push(this._formBuilder.group({
      CATEGORY: ['CEO'],
      NAME: ['', Validators.required],
      FROM_DATE: ['', Validators.required],
      TO_DATE: ['', Validators.required]
    }))
  }

  addCFO() {
    const add = this.assessmentForm.get("CFO") as FormArray

    add.push(this._formBuilder.group({
      CATEGORY: ['CFO'],
      NAME: ['', Validators.required],
      FROM_DATE: ['', Validators.required],
      TO_DATE: ['', Validators.required]
    }))
  }

  addMainBanker() {
    const add = this.assessmentForm.get("MAIN_BANKER") as FormArray

    add.push(this._formBuilder.group({
      CATEGORY: ['Main Banker'],
      NAME: ['', Validators.required],
      FROM_DATE: ['', Validators.required],
      TO_DATE: ['', Validators.required]
    }))
  }

  addDirector() {
    const add = this.assessmentForm.get("DIRECTOR") as FormArray

    add.push(this._formBuilder.group({
      CATEGORY: ['Director'],
      NAME: ['', Validators.required],
      FROM_DATE: ['', Validators.required],
      TO_DATE: ['', Validators.required]
    }))
  }

  get f1(): any {
    const add = this.assessmentForm.get("NAME_OF_AUDITOR") as FormArray
    return add.controls
  }

  get f2(): any {
    const add = this.assessmentForm.get("CEO") as FormArray
    return add.controls
  }

  get f3(): any {
    const add = this.assessmentForm.get("CFO") as FormArray
    return add.controls
  }

  get f4(): any {
    const add = this.assessmentForm.get("MAIN_BANKER") as FormArray
    return add.controls
  }

  get f5(): any {
    const add = this.assessmentForm.get("DIRECTOR") as FormArray
    return add.controls
  }

  checkTaxtAudit(event: any) {
    if (event.target.checked) {
      this.isTaxAudit = true;
      this.assessmentForm.get('TA_DUE_DATE')?.setValidators([Validators.required]);
      this.assessmentForm.get('TA_DUE_DATE')?.updateValueAndValidity();

    }
    else {
      this.isTaxAudit = false;
      this.assessmentForm.controls['TA_DUE_DATE'].removeValidators([Validators.required]);
      this.assessmentForm.controls['TA_DUE_DATE'].updateValueAndValidity();
      this.assessmentForm.get('TA_DUE_DATE')?.setValue(null);
    }
  }

  checkTransferPricing(event: any) {
    if (event.target.checked) {
      this.isTransferPricing = true;
      this.assessmentForm.get('TP_DUE_DATE')?.setValidators([Validators.required]);
      this.assessmentForm.get('TP_DUE_DATE')?.updateValueAndValidity();
    }
    else {
      this.isTransferPricing = false;
      this.assessmentForm.controls['TP_DUE_DATE'].removeValidators([Validators.required]);
      this.assessmentForm.controls['TP_DUE_DATE'].updateValueAndValidity();
      this.assessmentForm.get('TP_DUE_DATE')?.setValue(null);
    }
  }

  checkMasterFiling(event: any) {
    if (event.target.checked) {
      this.isMasterFiling = true;
      this.assessmentForm.get('MF_DUE_DATE')?.setValidators([Validators.required]);
      this.assessmentForm.get('MF_DUE_DATE')?.updateValueAndValidity();
    }
    else {
      this.isMasterFiling = false;
      this.assessmentForm.controls['MF_DUE_DATE'].removeValidators([Validators.required]);
      this.assessmentForm.controls['MF_DUE_DATE'].updateValueAndValidity();
      this.assessmentForm.get('MF_DUE_DATE')?.setValue(null);
    }
  }

  get f() {
    return this.assessmentForm.controls;
  }

  insertForm() {
    this.submitted = true;

    if (this.assessmentForm.invalid) {
      return;
    }

    this._apiHelper.post('AssessmentYear/InsertAssessmentForm', this.assessmentForm.value).subscribe((res: any) => {
      if (res.data == "EXISTS") {
        this._commonService.showErrorMsg('Company Assessment Year Mapping Already Created, Kindly Update it!')
      }
      else {
        this._commonService.showSuccessMessage('Your Form has been Submitted Successfully!')
        this.clearform();
        this._router.navigateByUrl('/assessment-year/user-landing');
      }
    })
  }

  getDropdown() {
    this._apiHelper.get('Company/GetCompany').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.companylist = res.Data;
      }
    });

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Assessment Year').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.assessmentYearList = res.Data;
      }
    });

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Name of Auditor').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.auditorList = res.Data;
      }
    });

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'CEO').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.CEOList = res.Data;
      }
    });

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'CFO').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.CFOList = res.Data;
      }
    });

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Main Banker').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.bankerList = res.Data;
      }
    });

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Director').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.directorList = res.Data;
      }
    });

  }

  GetAssessmentYearDetails(CompanyId: number, AssessmentYear: string) {
    this._apiHelper.get('AssessmentYear/GetAssYearDetails?CompanyID=' + CompanyId + '&AssessmentYear=' + AssessmentYear).subscribe((res: any) => {
      if (res.ResponseCode == 200) {

        this.assessmentForm.get('COMPANY_ID')?.setValue(res.Data.COMPANY_ID);
        this.assessmentForm.get('ASSESSMENT_YEAR')?.setValue(res.Data.ASSESSMENT_YEAR);

        const NA = this.assessmentForm.get('NAME_OF_AUDITOR') as FormArray;
        const data = res.Data.NAME_OF_AUDITOR;
        for (var i = 0; i < data.length; i++) {
          if (i > 0) {
            this.addAuditor()
          }
          NA.at(i).get('NAME')?.setValue(data[i].NAME);
          NA.at(i).get('FROM_DATE')?.setValue(formatDate(data[i].FROM_DATE, 'yyyy-MM-dd', 'en'));
          NA.at(i).get('TO_DATE')?.setValue(formatDate(data[i].TO_DATE, 'yyyy-MM-dd', 'en'));
        }

        const CEO = this.assessmentForm.get('CEO') as FormArray;
        const dataCEO = res.Data.CEO;
        for (var i = 0; i < dataCEO.length; i++) {
          if (i > 0) {
            this.addCEO()
          }
          CEO.at(i).get('NAME')?.setValue(dataCEO[i].NAME);
          CEO.at(i).get('FROM_DATE')?.setValue(formatDate(dataCEO[i].FROM_DATE, 'yyyy-MM-dd', 'en'));
          CEO.at(i).get('TO_DATE')?.setValue(formatDate(dataCEO[i].TO_DATE, 'yyyy-MM-dd', 'en'));
        }

        const CFO = this.assessmentForm.get('CFO') as FormArray;
        const dataCFO = res.Data.CFO;
        for (var i = 0; i < dataCFO.length; i++) {
          if (i > 0) {
            this.addCFO()
          }
          CFO.at(i).get('NAME')?.setValue(dataCFO[i].NAME);
          CFO.at(i).get('FROM_DATE')?.setValue(formatDate(dataCFO[i].FROM_DATE, 'yyyy-MM-dd', 'en'));
          CFO.at(i).get('TO_DATE')?.setValue(formatDate(dataCFO[i].TO_DATE, 'yyyy-MM-dd', 'en'));
        }

        const MB = this.assessmentForm.get('MAIN_BANKER') as FormArray;
        const dataMB = res.Data.MAIN_BANKER;
        for (var i = 0; i < dataMB.length; i++) {
          if (i > 0) {
            this.addMainBanker()
          }
          MB.at(i).get('NAME')?.setValue(dataMB[i].NAME);
          MB.at(i).get('FROM_DATE')?.setValue(formatDate(dataMB[i].FROM_DATE, 'yyyy-MM-dd', 'en'));
          MB.at(i).get('TO_DATE')?.setValue(formatDate(dataMB[i].TO_DATE, 'yyyy-MM-dd', 'en'));
        }

        const D = this.assessmentForm.get('DIRECTOR') as FormArray;
        const dataD = res.Data.DIRECTOR;
        for (var i = 0; i < dataD.length; i++) {
          if (i > 0) {
            this.addMainBanker()
          }
          D.at(i).get('NAME')?.setValue(dataD[i].NAME);
          D.at(i).get('FROM_DATE')?.setValue(formatDate(dataD[i].FROM_DATE, 'yyyy-MM-dd', 'en'));
          D.at(i).get('TO_DATE')?.setValue(formatDate(dataD[i].TO_DATE, 'yyyy-MM-dd', 'en'));
        }

        this.assessmentForm.get('IS_TAX_AUDIT')?.setValue(res.Data.IS_TAX_AUDIT);
        if (res.Data.IS_TAX_AUDIT == true) {
          this.isTaxAudit = true;
          this.assessmentForm.get('TA_DUE_DATE')?.setValue(formatDate(res.Data.TA_DUE_DATE, 'yyyy-MM-dd', 'en'));
        }

        this.assessmentForm.get('IS_TRANSFER_PRICING')?.setValue(res.Data.IS_TRANSFER_PRICING);
        if (res.Data.IS_TRANSFER_PRICING == true) {
          this.isTransferPricing = true;
          this.assessmentForm.get('TP_DUE_DATE')?.setValue(formatDate(res.Data.TP_DUE_DATE, 'yyyy-MM-dd', 'en'));
        }

        this.assessmentForm.get('IS_MASTER_FILING')?.setValue(res.Data.IS_MASTER_FILING);
        if (res.Data.IS_MASTER_FILING == true) {
          this.isMasterFiling = true;
          this.assessmentForm.get('MF_DUE_DATE')?.setValue(formatDate(res.Data.MF_DUE_DATE, 'yyyy-MM-dd', 'en'));
        }


      }
    });
  }

  deleteAuditor(Id: number) {
    const add = this.assessmentForm.get('NAME_OF_AUDITOR') as FormArray;
    add.removeAt(Id);
  }

  deleteCEO(Id: number) {
    const add = this.assessmentForm.get('CEO') as FormArray;
    add.removeAt(Id);
  }

  deleteCFO(Id: number) {
    const add = this.assessmentForm.get('CFO') as FormArray;
    add.removeAt(Id);
  }

  deleteMainBanker(Id: number) {
    const add = this.assessmentForm.get('MAIN_BANKER') as FormArray;
    add.removeAt(Id);
  }

  deleteDirector(Id: number) {
    const add = this.assessmentForm.get('DIRECTOR') as FormArray;
    add.removeAt(Id);
  }

  UpdateAssessmentYear() {
    this.submitted = true;
    if (this.assessmentForm.invalid) {
      return;
    }

    this._apiHelper.put('AssessmentYear/UpdateAssessmentForm', this.assessmentForm.value)
      .subscribe((res: any) => {
        if (res.responseCode == 200) {
          this._commonService.showSuccessMessage('Assessment year updated successfully !');
          this.clearform();
          this._router.navigateByUrl('/assessment-year/user-landing');
        }
      });
  }

  clearform() {
    this.assessmentForm.get('COMPANY_ID')?.setValue('');
    this.assessmentForm.get('ASSESSMENT_YEAR')?.setValue('');

    const NA = this.assessmentForm.get('NAME_OF_AUDITOR') as FormArray;
    NA.clear();
    NA.push(
      this._formBuilder.group({
        CATEGORY: [''],
        NAME: [''],
        FROM_DATE: [''],
        TO_DATE: ['']
      })
    );

    const CEO = this.assessmentForm.get('CEO') as FormArray;
    CEO.clear();
    CEO.push(
      this._formBuilder.group({
        CATEGORY: [''],
        NAME: [''],
        FROM_DATE: [''],
        TO_DATE: ['']
      })
    );

    const CFO = this.assessmentForm.get('CFO') as FormArray;
    CFO.clear();
    CFO.push(
      this._formBuilder.group({
        CATEGORY: [''],
        NAME: [''],
        FROM_DATE: [''],
        TO_DATE: ['']
      })
    );

    const MB = this.assessmentForm.get('MAIN_BANKER') as FormArray;
    MB.clear();
    MB.push(
      this._formBuilder.group({
        CATEGORY: [''],
        NAME: [''],
        FROM_DATE: [''],
        TO_DATE: ['']
      })
    );

    const D = this.assessmentForm.get('DIRECTOR') as FormArray;
    D.clear();
    D.push(
      this._formBuilder.group({
        CATEGORY: [''],
        NAME: [''],
        FROM_DATE: [''],
        TO_DATE: ['']
      })
    );

    this.assessmentForm.get('IS_TAX_AUDIT')?.setValue(false);
    this.assessmentForm.get('IS_TRANSFER_PRICING')?.setValue(false);
    this.assessmentForm.get('IS_MASTER_FILING')?.setValue(false);
    this.isTaxAudit = false;
    this.isTransferPricing = false;
    this.isMasterFiling = false;
    this.assessmentForm.get('TA_DUE_DATE')?.setValue('');
    this.assessmentForm.get('TP_DUE_DATE')?.setValue('');
    this.assessmentForm.get('MF_DUE_DATE')?.setValue('');

  }

  ngAfterContentInit(): void {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: false })

  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }

}
