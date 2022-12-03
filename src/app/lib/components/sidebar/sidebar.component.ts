import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout-service/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  config: any;

  constructor(private _layoutService: LayoutService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._layoutService.getConfig().subscribe(resp => { this.config = resp })
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }
}
