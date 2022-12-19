import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { debug } from 'console';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {

  @Input() tableData: Array<any> = []
  @Input() tableColumn: Array<any> = []
  @Input() showViewBtn: boolean = false
  @Input() showEditBtn: boolean = false
  @Input() showDeleteBtn: boolean = false

  @Output() onView: any = new EventEmitter<any>();
  @Output() onEdit: any = new EventEmitter<any>();
  @Output() onDelete: any = new EventEmitter<any>();
  DataKeys: Array<any> = []
  constructor(private cdref: ChangeDetectorRef) { }
  ngAfterViewInit(): void {

    $("#example").DataTable();
    $("#example").DataTable().destroy();
    $("#example").DataTable();



  }
  ngOnChanges(changes: SimpleChanges) {





  }

  ngOnInit(): void {
    if (this.tableData.length > 0) {
      this.DataKeys = Object.keys(this.tableData[0]);
    }


  }

  edit(item: any) {
    this.onEdit.emit(item)
  }
  view(item: any) {
    this.onView.emit(item)
  }
  delete(item: any) {
    this.onDelete.emit(item)
  }
}

