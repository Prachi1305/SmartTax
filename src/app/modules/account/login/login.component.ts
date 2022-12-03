import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';
import { StorageService } from 'src/app/lib/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tableColumn: Array<any> = ["Sr.No", "First Name", "Last Name", "Twitter"]
  tableData: Array<any> = [{ "firstname": "Aditya", "lastname": "Deokar", "twitter": "@adityadeokar" }, { "firstname": "Rutuja", "lastname": "Deokar", "twitter": "@rutujadeokar" }]
  constructor(private _layoutService: LayoutService, private storageService: StorageService) { }

  ngOnInit(): void {
    
    // this.storageService.setLocalStorageItem("bacchi","Saurabh")
  }

  view(item:any)
  {
   alert(JSON.stringify(item))
  }
  ngAfterContentInit():void
  {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: false })
  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }



}
