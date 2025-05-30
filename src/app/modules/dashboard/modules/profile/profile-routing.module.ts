import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileContextComponent} from './components/profile-context/profile-context.component';
import {ProfileHomeComponent} from './components/profile-home/profile-home.component';

const routes: Routes = [
  {path: '', redirectTo: '/context/home', pathMatch: 'full'},
  {
    path: 'context', loadComponent: () => ProfileContextComponent, loadChildren: () => [
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path: 'home',component:ProfileHomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
