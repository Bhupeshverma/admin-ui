import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../user.service';
import { UserDataSource, NewTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['actions'];
  dataSource!: UserDataSource;
  users: NewTableItem[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: UserService) {
    this.service.getUsers().subscribe((res) => {
      this.users = res;
      this.modifyUsersData(this.users);
    });
  }
  // Modifying users data to get dynamic column headers in table 
  modifyUsersData(users: {}[]): void {
    let columns = Object.keys(users[0]).filter((item) => item !== 'id');
    this.displayedColumns.unshift(...['select'],...columns);
    this.refreshDataSource(this.users);
  }

  refreshDataSource(data: NewTableItem[]) {
    this.dataSource = new UserDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  deleteRow(data: NewTableItem[]) {
    this.refreshDataSource(data);
  }
  deleteSelectedRows(value: any) {
    if (value === 'All') {
      this.refreshDataSource([]);
    } else {
      this.refreshDataSource(value);
    }
    this.dataSource.selection = new SelectionModel<NewTableItem>(true, []);
  }
}
