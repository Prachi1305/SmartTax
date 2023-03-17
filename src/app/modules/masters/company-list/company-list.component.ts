import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companyList: any[] = [];
  tableColumn: any[] = ["No", "CompanyName", "PAN", "Status"]
  tablekeys: any[] = ["NAME", "PAN", "STATUS"]
  constructor(
    private _apiHelper: ApiHelperService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.GetCompanyMasterList();
  }

  GetCompanyMasterList() {
    this._apiHelper.get('Company/GetCompany').subscribe((res: any) => {
      if (res.ResponseCode == 200) {
        this.companyList = res.Data;
      }
    });
  }

  deleteCompany(Id: number) {
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
        this._apiHelper.delete('Company/DeleteCompany?Company_ID=' + Id)
          .subscribe((res: any) => {
            if (res.ResponseCode == 200) {
              Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
              this.GetCompanyMasterList();
            }
          });
      }
    });
  }

  edit(item: any) {
    //alert(JSON.stringify(item))
    this._router.navigate(["/masters/company/" + item.ID])
  }
  OnDelete(item:any) {
   this.deleteCompany(item.ID)

  }

}
