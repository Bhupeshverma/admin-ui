import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NewTableItem } from './data-table/data-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serviceUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<NewTableItem[]> {
    return this.http.get<NewTableItem[]>(this.serviceUrl)
  }

}
