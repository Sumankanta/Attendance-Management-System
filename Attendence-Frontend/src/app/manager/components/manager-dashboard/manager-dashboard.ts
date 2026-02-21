import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Manager } from '../../services/manager';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorage } from '../../../basic/basic-services/user-storage';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css',
})
export class ManagerDashboard implements OnInit {

  employeeDetail: any[] = [];
  loading = false;
  selectedDate = new Date();
  searchText = '';

  presentCount = 0;
  absentCount = 0;

  constructor(
    private managerService: Manager,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;

    this.managerService.getEmployees().subscribe({
      next: (res: any[]) => {
        this.employeeDetail = res;
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  calculateStats() {
    this.presentCount = this.employeeDetail.filter(e => e.status === 'PRESENT').length;
    this.absentCount = this.employeeDetail.filter(e => e.status === 'ABSENT').length;
  }

  filteredEmployees() {
    if (!this.searchText) return this.employeeDetail;

    return this.employeeDetail.filter(e =>
      e.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  markAttendance(emp: any, status: string) {
    emp.status = status;   // update locally

    // TODO: call backend API here
    console.log(`Marked ${emp.name} as ${status}`);

    this.calculateStats();
  }

  // marksAttendence(type: string, employeeId: number, projectId: number) {
  //   const data = {
  //     employeeId: employeeId,
  //     managerId: UserStorage.getUserId(),
  //     projectId: projectId,
  //     attendanceStatus: type
  //   }

  //   this.managerService.markAttendance(data).subscribe(res => {
  //     this.message.success(`Attendance marked successfully`, { nzDuration: 5000 });
  //   }, error => {
  //     this.message
  //       .error(
  //         `${error.error}`,
  //         { nzDuration: 5000 }
  //       )
  //   })
  // }

  marksAttendence(emp: any, status: string) {
    if (emp.status) {
      this.message.warning(
        `${emp.name}'s attendance already marked as ${emp.ststus}`,
        { nzDuration: 3000 }
      );
      return;
    }

    const payload = {
      employeeId: emp.id,
      managerId: UserStorage.getUserId(),
      projectId: emp.projectId,
      attendanceStatus: status
    };

    this.managerService.markAttendance(payload).subscribe({
      next: () => {
        emp.status = status; // update UI only after success
        emp.isLocked = true; // custom flag

        this.calculateStats();

        this.message.success(
          `$${emp.name} marked as ${status}`,
          { nzDuration: 3000 }
        );
      },
      error: (err) => {
        this.message.error(
          err.error || 'Attendance already marked',
          { nzDuration: 3000 }
        );
      }
    });
  }
}
