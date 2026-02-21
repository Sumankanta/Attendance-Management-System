import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorage } from '../../basic/basic-services/user-storage';

const baseUrl = 'http://localhost:8081';

@Injectable({
  providedIn: 'root',
})
export class Employee {

  constructor(private http: HttpClient){};

  applyLeave(leaveDto:any): Observable<any>{
    return this.http.post(baseUrl + "/api/attendance/add/leave", leaveDto)
  }

  getMyLeaves(): Observable<any>{
    return this.http.get(baseUrl + "/api/attendance/leave/employee/" +
      UserStorage.getUserId()
    )
  }

}
