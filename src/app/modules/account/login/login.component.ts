import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from 'src/app/lib/services/api-helpers/api-helper.service';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';
import { StorageService } from 'src/app/lib/services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private _router: Router,
    private _layoutService: LayoutService,
    private _apiHelper: ApiHelperService,
    private _formbuilder: FormBuilder,
    private _enc:StorageService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this._formbuilder.group({
      USERNAME: [''],
      PASSWORD: [''],
    })
  }

  login(): void {
    this._apiHelper.post('Account/Authenticate', this.loginForm.value).subscribe((res: any) => {
      console.log(res.isAuthenticated);
      if (res.isAuthenticated == true) {
        this._enc.setLocalStorageItem('currentUser', JSON.stringify(res));
        this._router.navigate(["/assessment-year/user-landing"]);
      }
      else {
        alert(res.message);
      }
    })

  }

  ngAfterContentInit(): void {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: false })

  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }



}
