import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Employee } from '../service/employee';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorage } from '../../basic/basic-services/user-storage';

@Component({
  selector: 'app-employee-dashboard',
  imports: [SharedModule],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
})
export class EmployeeDashboard {

  leaves:any;

  constructor(
    private employeeService: Employee,
    private message: NzMessageService
  ) { }

  ngOnInit(){
    this.getMyLeaves();
  }

  applyLeave(){
    const data = {

      employeeId: UserStorage.getUserId(),
      projectId: UserStorage.getUserProjectId(),
    }

    this.employeeService.applyLeave(data).subscribe(res => {

      this.message
      .success(
        `Leave applied successfully`,
        { nzDuration: 5000},
      )
    }, error => {
      this.message.error(
        `${error.error}`,
        { nzDuration: 5000}
      )
    });
  }

  getMyLeaves(){
    this.employeeService.getMyLeaves().subscribe(res => {
      this.leaves = res;
      console.log(this.leaves);
    }, error => {
      console.log(error);
    })
  }

}
