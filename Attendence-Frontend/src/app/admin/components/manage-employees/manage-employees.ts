import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Admin } from '../../services/admin';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-employees',
  imports: [SharedModule],
  templateUrl: './manage-employees.html',
  styleUrl: './manage-employees.css',
})
export class ManageEmployees {

  employeeForm!: FormGroup;
  project: any;
  // message: any;
  employees:any;

  constructor(
    private fb: FormBuilder,
    private adminService: Admin,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })

    this.getAllProjects();
    this.getAllEmployees();
  }

    getAllProjects(){
    this.adminService.getProjects().subscribe(res => {
      this.project = res;
      console.log(this.project);
    }, err => {
      console.log(err);
    })
  }

    submitForm(){
    const data = this.employeeForm.value;
    data.userRole = "EMPLOYEE";

    this.adminService.addUser(data).subscribe(res=>{
      this.message.success("Employee Created Successfully", {nzDuration: 5000});
      this.getAllEmployees();
      this.employeeForm.reset();
    }, error => {
      this.message.error("Something went wrong", {nzDuration: 5000});
    })
  }

  getAllEmployees(){
    this.adminService.getEmployees().subscribe(res => {
      this.employees = res;
      console.log(this.employees);
    }, err => {
      console.log(err);
    })
  }
}
