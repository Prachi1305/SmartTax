import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout-service/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  config: any;
  constructor(private _layoutService: LayoutService, private cdref: ChangeDetectorRef) { }
  ngOnInit(): void {
    this._layoutService.getConfig().subscribe(res => {
      this.config = res
    })
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }
  ngAfterContentInit(): void { }


}
