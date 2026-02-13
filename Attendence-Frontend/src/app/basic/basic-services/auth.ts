import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = "http://localhost:8081"; //Backend url

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(private http: HttpClient) {
  }

  loginUser(loginData:any): Observable<any>{
    return this.http.post(baseUrl + `/api/auth/login`, loginData)
  }
}
