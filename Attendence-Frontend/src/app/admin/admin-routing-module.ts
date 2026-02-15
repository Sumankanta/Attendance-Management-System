import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ManageProjects } from './components/manage-projects/manage-projects';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboard
  },
  {
    path: 'manage-projects',
    component: ManageProjects
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
