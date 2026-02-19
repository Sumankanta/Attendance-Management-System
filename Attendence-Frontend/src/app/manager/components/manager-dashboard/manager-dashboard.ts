import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Manager } from '../../services/manager';

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

  constructor(private managerService: Manager){}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(){
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

  calculateStats(){
    this.presentCount = this.employeeDetail.filter(e => e.status === 'PRESENT').length;
    this.absentCount = this.employeeDetail.filter(e => e.status === 'ABSENT').length;
  }

  filteredEmployees(){
    if(!this.searchText) return this.employeeDetail;

    return this.employeeDetail.filter(e =>
      e.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  markAttendance(emp: any, status: string){
    emp.status = status;   // update locally

    // TODO: call backend API here
    console.log(`Marked ${emp.name} as ${status}`);

    this.calculateStats();
  }

}
