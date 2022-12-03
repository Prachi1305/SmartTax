import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { LayoutService } from './lib/services/layout-service/layout.service';
import { StorageService } from './lib/services/storage-service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-boilerplate-demo';
  config: any;
  constructor(private storage: StorageService, private _layoutService: LayoutService,private cdref: ChangeDetectorRef) {
    //this._layoutService.setConfig({header:false,footer:true,sidebar:false})
  }
  ngOnInit(): void {

    this._layoutService.getConfig().pipe().subscribe(res => {
      this.config = res
      console.log(res)


    })
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }

}
