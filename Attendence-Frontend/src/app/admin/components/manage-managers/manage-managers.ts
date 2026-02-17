import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { Admin } from '../../services/admin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { email, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-manage-managers',
  imports: [SharedModule],
  templateUrl: './manage-managers.html',
  styleUrl: './manage-managers.css',
})
export class ManageManagers {

  project:any;
  managerForm!: FormGroup;
  managers: any;

  constructor(
    private adminService: Admin,
    private fb: FormBuilder,
    private message: NzMessageService
  ){}

  ngOnInit(){

    this.managerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })

    this.getAllProjects();
    this.getAllManagers();
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
    const data = this.managerForm.value;
    data.userRole = "MANAGER";

    this.adminService.addUser(data).subscribe(res=>{
      this.message.success("Manager Created Successfully", {nzDuration: 5000});
      this.managerForm.reset();
    }, error => {
      this.message.error("Something went wrong", {nzDuration: 5000});
    })
  }

  getAllManagers(){
    this.adminService.getManagers().subscribe( res => {
      this.managers = res;
      console.log(this.managers);
    },err => {
      console.log(err);
    })
  }
}
