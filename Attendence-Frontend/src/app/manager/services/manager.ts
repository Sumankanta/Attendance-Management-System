import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorage } from '../../basic/basic-services/user-storage';

const url = "http://localhost:8081";

@Injectable({
  providedIn: 'root',
})
export class Manager {

  constructor(private http: HttpClient){}

  getEmployees(){
    const projectId = UserStorage.getUserProjectId();

    if(!projectId){
      console.error("Project ID missing");
      return this.http.get<any[]>(`${url}/api/managers/employees/0`);
    }

    return this.http.get<any[]>(
      `${url}/api/managers/employees/${projectId}`
    );
  }

  markAttendance(attendenceDto:any){
    return this.http.post(url + "/api/attendance/add", attendenceDto);
  }
}
