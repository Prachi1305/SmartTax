import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { CommonService } from 'src/app/lib/services/common-service/common.service';
import { MASTERS_API_LIST } from '../../masters/masters-api';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {

  balancesheetForm: FormGroup;
  assetsList: any[] = [];
  LiabilityList: any[] = [];
  fileList: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _commonService: CommonService,
    private _apiHelper: ApiHelperService,
  ) { }

  ngOnInit(): void {
    this.balancesheetForm = this._formBuilder.group({
      ASSETs: new FormArray([]),
      LIABILITYs: new FormArray([]),
    });

    this.addAssets();
    this.addLiabilities();
    this.getDropdown();
  }

  addAssets() {
    const add = this.balancesheetForm.get("ASSETs") as FormArray

    add.push(this._formBuilder.group({
      ASSET: [''],
      ASSET_AMOUNT: ['']
    }))
  }

  addLiabilities() {
    const add = this.balancesheetForm.get("LIABILITYs") as FormArray

    add.push(this._formBuilder.group({
      LIABILITY: [''],
      LIABILITY_AMOUNT: ['']
    }))
  }

  getDropdown() {
    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Assets').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.assetsList = res.Data;
      }
    })

    this._apiHelper.get(MASTERS_API_LIST.GET_CATEGORY_FROM_SYSTEM_TYPE + 'Liabilities').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.LiabilityList = res.Data;
      }
    })
  }

  get f1(): any {
    const add = this.balancesheetForm.get("ASSETs") as FormArray
    return add.controls;
  }

  get f2(): any {
    const add = this.balancesheetForm.get("LIABILITYs") as FormArray
    return add.controls;
  }

  SaveBalanceSheet() {
    this.uploadFilestoDB();

  }

  uploadFile = (event: any) => {
    this.fileList.push({
      FILE: event.target.files[0],
    });
  }

  uploadFilestoDB() {
    const payload = new FormData();
    this.fileList.forEach((element: any) => {
      payload.append('FILE', element.FILE);
    });

    this._commonService.uploadFiles(payload).subscribe();
  }

}
