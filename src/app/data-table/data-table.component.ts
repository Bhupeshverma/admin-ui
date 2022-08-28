import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';

export interface UserData {
  id: string;
  name: string;
  email: any;
  role: any;
  isEdit: boolean
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'actions'];
  dataSource!: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);
  users: any;
  valid: any = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: UserService) { 
    this.service.getUsers().subscribe((res) => {
      this.users = res
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    this.users?.forEach((user: UserData) => {
      user.isEdit = false
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  deleteRow(row: UserData) {
    this.dataSource.data = this.dataSource.data.filter((elem) => elem.id !== row.id)
  }
  editRow(row: UserData) {
    row.isEdit = !row.isEdit
  }
  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  deleteAllSelected() {
    if (this.isAllSelected()) {
      this.dataSource.data = []
    } else {
      this.dataSource.data = this.dataSource.data.filter((data) => (
        !this.selection.selected.find((selected) => (
          data.id === selected.id
        ))
      ))
    }
    this.selection = new SelectionModel<UserData>(true, []);
  }
  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

}
