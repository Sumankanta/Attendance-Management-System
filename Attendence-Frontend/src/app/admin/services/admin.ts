import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:8081";

@Injectable({
  providedIn: 'root',
})
export class Admin {

  constructor(private http: HttpClient){}

  addProject(project:any): Observable<any>{
    return this.http.post(baseUrl + "/api/projects/add", project);
  }

  getProjects(): Observable<any>{
    return this.http.get(baseUrl + "/api/projects/all");
  }

  addUser(data:any): Observable<any>{
    return this.http.post(baseUrl + "/api/admin/create-user", data);
  }

  getManagers(): Observable<any>{
    return this.http.get(baseUrl + "/api/admin/managers")
  }

  getEmployees(): Observable<any>{
    return this.http.get(baseUrl + "/api/admin/employee")
  }
}
