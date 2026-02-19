import { Routes } from '@angular/router';
import Login from './basic/login/login';

export const routes: Routes = [
  {path:'', component: Login},
  {path:'admin', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)},
  {path:'employee', loadChildren: () => import('./employee/employee-module').then(m => m.EmployeeModule)},
  {path:'manager', loadChildren: () => import('./manager/manager-module').then(m => m.ManagerModule)}
];

// ng g m admin --routing
