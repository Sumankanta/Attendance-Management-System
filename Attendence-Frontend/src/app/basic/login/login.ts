import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent, NzInputWrapperComponent } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule, provideNzIcons } from 'ng-zorro-antd/icon';

// 👉 IMPORT ICONS HERE
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { Auth } from '../basic-services/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorage } from '../basic-services/user-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormDirective,
    NzInputDirective,
    NzInputGroupComponent, // ✅ required
    NzButtonComponent,
    NzIconModule,
    // NzInputWrapperComponent
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
      }
        console.log(res);
    }, error => {
      this.message.error(`Bad Credentials`, { nzDuration: 5000 })
    })
  }
}

export default Login
