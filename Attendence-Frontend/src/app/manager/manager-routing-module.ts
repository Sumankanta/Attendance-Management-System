import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboard } from './components/manager-dashboard/manager-dashboard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ManagerDashboard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
