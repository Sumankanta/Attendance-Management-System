import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../../services/admin';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-projects',
  imports: [SharedModule],
  templateUrl: './manage-projects.html',
  styleUrl: './manage-projects.css',
})
export class ManageProjects {

  projectForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private adminService: Admin,
    private message: NzMessageService
  ){}

  projects:any;
  ngOnInit(){
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      startDate: [null, [Validators.required]]
    })
    this.getAllProjects();
  }

  submitForm(){
    this.adminService.addProject(this.projectForm.value).subscribe(res => {
      this.message.success("Project posted successfully", {nzDuration: 5000});
      this.projectForm.reset();
      this.getAllProjects();
    }, error => {
      this.message.error("Error while posting project", {nzDuration: 5000})
    }
  )}

  getAllProjects(){
    this.adminService.getProjects().subscribe(res => {
      this.projects = res;
      console.log(this.projects);
    })
  }

}
