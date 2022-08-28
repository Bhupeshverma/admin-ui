import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
  }

}
