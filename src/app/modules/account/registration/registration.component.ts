import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/lib/services/layout-service/layout.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _layoutService:LayoutService) { }

  ngOnInit(): void {
    //this._layoutService.setConfig({ header: true, footer: true, sidebar: true })
  }
  ngAfterContentInit():void
  {
    this._layoutService.setConfig({ header: true, footer: true, sidebar: true })
  }
  ngOnDestroy(): void {
    this._layoutService.resetConfig();
  }


}
