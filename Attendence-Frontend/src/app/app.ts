import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared-module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UserStorage } from './basic/basic-services/user-storage';

@Component({
  selector: 'app-root',
  imports: [SharedModule, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Attendence-Frontend';

  isEmploeeLoggedIn:boolean = UserStorage.isEmployeeLoggedIn();
  isManagerLoggedIn:boolean = UserStorage.isManagerLoggedIn();
  isAdminLoggedIn:boolean = UserStorage.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe((events) => {
      this.isEmploeeLoggedIn = UserStorage.isEmployeeLoggedIn();
      this.isManagerLoggedIn = UserStorage.isManagerLoggedIn();
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
    });
  }
}
