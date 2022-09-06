import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDataSource } from 'src/app/data-table/data-table-datasource';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() row: any | undefined
  @Input() column: any | undefined
  @Output() dataChanged = new EventEmitter()
  col: any
  valid: any = {};
  @Input() dataSource: UserDataSource | undefined
  constructor() {
   }

  ngOnInit(): void {
  }
  deleteRow(row: any) {
    const newData = this.dataSource?.data.filter((elem) => elem.id !== row.id)
    this.dataChanged.emit(newData)
  }
  editRow (row: any) {
    row.isEdit = !row.isEdit
  }
  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }
  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

}
