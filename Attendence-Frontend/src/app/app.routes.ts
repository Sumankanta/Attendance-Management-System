import { Routes } from '@angular/router';
import Login from './basic/login/login';

export const routes: Routes = [
  {path:'', component: Login},
  {path:'admin', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)},
];

// ng g m admin --routing
