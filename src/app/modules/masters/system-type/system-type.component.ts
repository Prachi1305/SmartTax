import { ChangeDetectorRef, Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { CommonService } from 'src/app/lib/services/common-service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-type',
  templateUrl: './system-type.component.html',
  styleUrls: ['./system-type.component.css']
})
export class SystemTypeComponent implements OnInit {

  systemTypeMasterList: any[] = [];
  masterForm: FormGroup;
  categoryList: any[] = ['Verticals', 'State', 'Status', 'Name of Auditor', 'CEO', 'CFO', 'Main Banker',
    'Director', 'Assessment Year', 'Severity', 'Assets', 'Liabilities'];
  submitted: boolean = false;
  isUpdate: boolean = false;
  tableColumn: any[] = ["No", "Category", "Name", "Description", "Active/Inactive"]
  tablekeys: any[] = ["CATEGORY", "NAME", "DESCRIPTION", "STATUS"]

  @ViewChild('openModalPopup') openModalPopup: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(
    private _commonService: CommonService,
    private _formBuilder: FormBuilder,
    private _apiHelper: ApiHelperService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.masterForm = this._formBuilder.group({
      ID: [0],
      CATEGORY: [''],
      NAME: [''],
      DESCRIPTION: [],
      STATUS: [true]
    })
    this.GetSystemTypeMasterList();

    this.categoryList;
  }

  GetSystemTypeMasterList() {
    this._apiHelper.get('Common/GetSystemTypeMasterList')
      .subscribe((res: any) => {
        if (res.ResponseCode == 200) {
          this.systemTypeMasterList = res.Data;
        }
      });
  }

  openModal(data: any) {
    var ID = data.ID;
    this.submitted = false;
    this.isUpdate = false;
    this.ClearForm();

    if (ID > 0) {
      this.isUpdate = true;
      this.GetSystemTypeMasterDetails(ID);
    }

    this.openModalPopup.nativeElement.click();
  }

  InsertystemTypeMaster() {
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }

    this._apiHelper.post('Common/InsertSystemTypeMaster', this.masterForm.value).subscribe((res: any) => {
      if (res.responseCode == 200) {
        this._commonService.showSuccessMessage('System Type Master Saved Successfully');
        this.GetSystemTypeMasterList();
        this.closeBtn.nativeElement.click();
      }
    });
  }

  ClearForm() {
    this.masterForm.reset();
    this.masterForm.get('ID')?.setValue(0);
    this.masterForm.get('CATEGORY')?.setValue('');
    this.masterForm.get('STATUS')?.setValue(true);
  }

  GetSystemTypeMasterDetails(Id: number) {
    this._apiHelper.get('Common/GetSystemTypeMasterDetails?&ID=' + Id)
      .subscribe((res: any) => {
        if (res.ResponseCode == 200) {
          this.masterForm.patchValue(res.Data);
        }
      });
  }

  updateSystemTypeMaster() {
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }

    this._apiHelper.put('Common/UpdateSystemTypeMaster', this.masterForm.value)
      .subscribe((res: any) => {
        if (res.responseCode == 200) {
          this._commonService.showSuccessMessage('System Type Master updated successfully !');
          this.GetSystemTypeMasterList();
          this.closeBtn.nativeElement.click();
        }
      });
  }

  deleteSystemTypeMaster(Id: number) {
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
        this._apiHelper.delete('Common/DeleteSystemTypeMaster?ID=' + Id)
          .subscribe((res: any) => {
            if (res.ResponseCode == 200) {
              Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
              this.GetSystemTypeMasterList();
            }
          });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    //this.ngOnInit();
    this.cdref.detectChanges();


  }
}
