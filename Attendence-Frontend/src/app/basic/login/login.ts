import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// 👉 IMPORT ICONS HERE
import { Auth } from '../basic-services/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorage } from '../basic-services/user-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
class Login {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm() {
    this.authService.loginUser(this.loginForm.value).subscribe(res => {
      UserStorage.saveUser(res);

      if (UserStorage.isAdminLoggedIn()){
        this.router.navigateByUrl('/admin/dashboard')
      }else if(UserStorage.isEmployeeLoggedIn()){
        this.router.navigateByUrl('/employee/dashboard')
      }else if(UserStorage.isManagerLoggedIn()){
        this.router.navigateByUrl('/manager/dashboard')
      }
        console.log(res);
    }, error => {
      this.message.error(`Bad Credentials`, { nzDuration: 5000 })
    })
  }
}

export default Login
