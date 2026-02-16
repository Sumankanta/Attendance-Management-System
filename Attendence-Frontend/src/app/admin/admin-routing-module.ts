import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ManageProjects } from './components/manage-projects/manage-projects';
import { ManageManagers } from './components/manage-managers/manage-managers';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboard
  },
  {
    path: 'manage-projects',
    component: ManageProjects
  },
  {
    path: 'manage-managers',
    component: ManageManagers
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
