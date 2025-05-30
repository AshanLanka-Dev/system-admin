import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardContextComponent} from './components/dashboard-context/dashboard-context.component';
import {DashboardDefaultComponent} from './components/dashboard-default/dashboard-default.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/process/home', pathMatch: 'full'},
  {
    path: 'process', component: DashboardContextComponent, children: [
      {path: '', redirectTo: '/dashboard/process/home', pathMatch: 'full'},
      {path: 'home', component: DashboardDefaultComponent},
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(e => e.AdminModule)
      },
      {
        path:'profile',
        loadChildren:()=>import('./modules/profile/profile.module').then(e=>e.ProfileModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
