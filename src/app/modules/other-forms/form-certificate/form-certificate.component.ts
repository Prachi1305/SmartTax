import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';

const pdfMake = require('pdfmake/build/pdfmake.js');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-form-certificate',
  templateUrl: './form-certificate.component.html',
  styleUrls: ['./form-certificate.component.css']
})
export class FormCertificateComponent implements OnInit {

  partAForm: FormGroup;
  sectionID: string;

  formDetails: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiHelper: ApiHelperService
  ) { }

  ngOnInit(): void {

    this.partAForm = this._formBuilder.group({
      FIRST_NAME: [''],
      MIDDLE_NAME: [''],
      LAST_NAME: [''],
      GENDER: [''],
      DATE_OF_BIRTH: [''],
      DESIGNATION: [''],
      FLAT: [''],
      NAME_OF_PREMISES: [''],
      ROAD: [''],
      AREA: [''],
      TOWN: [''],
      STATE: [''],
      PIN_CODE: [''],
      EMAIL_ADDRESS: [''],
      PHONE_NO: [''],
      MOBILE_NO: [''],
      RESIDENT_TYPE: [''],
      STATUS: [''],
      NAME_OF_PARTY: [''],
      ADDRESS_OF_PARTY: [''],
      PAN_OF_PARTY: [''],
      PARTICULARS_OF_ASSET: [''],
      EXPECTED_DATE_OF_TRANSFER: [''],
      PERIOD: [''],
      ADDITIONAL_INFO: [''],
      NATURE_OF_TRANSACTION: [''],
      ASSESSEE_OUTSTANDING_DEMAND: [''],
      IS_CIR_CIBIL_AVAILABLE: [''],
      PARTB_FORM: new FormArray([]),
      PARTC_FORM: new FormArray([])

    });


  }

  addTableRow() {
    const add = this.partAForm.get("PARTB_FORM") as FormArray

    add.push(this._formBuilder.group({
      ASSESSMENT_YEAR: [''],
      DEMAND_SECTION: [''],
      OUTSTANDING_DEMAND: [''],
      PARTICULARS_OF_STAY: [''],
      REMARKS: ['']
    }))

  }

  get f(): any {
    var x = this.partAForm.get("PARTB_FORM") as FormArray
    return x.controls
  }

  get f2(): any {
    var x = this.partAForm.get("PARTC_FORM") as FormArray
    return x.controls
  }

  deleteRow(index: any) {
    const add = this.partAForm.get('PARTB_FORM') as FormArray;
    if (add.length == 1) {
      alert("Can't delete the row when there is only one row");
      return false;
    } else {
      if (confirm('Are you sure want to delete?')) {
        add.removeAt(index);
      }
      return true;
    }
  }

  addTableRow2() {
    const add = this.partAForm.get("PARTC_FORM") as FormArray

    add.push(this._formBuilder.group({
      ASSET_DESCRIPTION: [''],
      PARTICULARS_OF_PLACE: [''],
      VALUE_OF_THE_ASSET: [''],
      IS_CHARGE_EXISTS: [''],
      REMARKS: ['']
    }))
  }

  deleteRow2(index: any) {
    const add = this.partAForm.get('PARTC_FORM') as FormArray;
    if (add.length == 1) {
      alert("Can't delete the row when there is only one row");
      return false;
    } else {
      if (confirm('Are you sure want to delete?')) {
        add.removeAt(index);
      }
      return true;
    }
  }

  SubmitForm() {

    console.log("form" + JSON.stringify(this.partAForm.value));

    // this._apiHelper.post('Form/InsertForm', this.partAForm.value)
    //   .subscribe((res: any) => {
    //     if (res.responseCode == 200) {
    //       this.sectionID = res.data;
    //       console.log(JSON.stringify(res));
    //       console.log("section id" + Number(this.sectionID));
    //       alert("saved");

    //       this._apiHelper.get('Form/GetForm?SectionID=' + Number(this.sectionID)).subscribe((res: any) => {
    //         if (res.ResponseCode == 200) {
    //           this.formDetails = res.Data;
    //           console.log(this.formDetails);
    //           this.generateForm();
    //         }
    //       });
    //     }
    //   });

    this._apiHelper.get('Form/GetForm?SectionID=' + 1).subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.formDetails = res.Data;
        console.log(this.formDetails);
        this.generateForm();
      }
    });


  }

  async generateForm() {
    let docDefinition = {
      pageMargins: [60, 40, 80, 40],

      content: [
        { text: 'FORM I.T.N.S. 281', style: 'header' },
        { text: 'Application u/s 281 of the Income Tax Act, 1961 ', style: 'header' },
        { text: 'Date: ………………………………………', style: 'rightStyle' },
        { text: 'To,', margin: [0, 15, 0, 0] },
        { text: 'The Assessing Officer,' },
        { text: '………………………………………………' },
        { text: '………………………………………………' },
        { text: '………………………………………………' },
        {
          text: 'I/M/S ………………………………………………………………………………………………………………………………………… (name of the assesse in block letters)' +
            'son/daughter of …………………………………………do, hereby, request that permission may be granted under clause (ii) of' +
            'the proviso to section 281 creating a charge on, or to part with the possession (by way of sale, ' +
            'mortgage, gift, exchange or any other mode of transfer whatsoever) of asset(s) given in D4 of Part D ' +
            'below in favour of person(s) to be mentioned in D1 of Part D below.', margin: [0, 15, 0, 0]
        },
        { text: 'PART A - GENERAL PARTICULARS', style: 'header', margin: [0, 15, 0, 0] },
        {
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          }
        }

      ],

      styles: {
        header: {
          fontSize: 10,
          bold: true,
          alignment: 'center'
        },
        rightStyle: {
          alignment: 'right',
          margin: [0, 15, 0, 0]
        },

      }

    };

    //pdfMake.createPdf(docDefinition).open();


  }

}
