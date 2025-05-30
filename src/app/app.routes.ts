import { Routes } from '@angular/router';
import {SignOutComponent} from './components/sign-out/sign-out.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {authGuard} from './guard/auth.guard';
import {CameraAccessComponent} from './components/camera-access/camera-access.component';

export const routes: Routes = [
  {path: '', redirectTo: '/security', pathMatch: 'full'},
  {path: 'security', loadChildren: () => import('./modules/security/security.module').then(e => e.SecurityModule)},
  {
    path: 'user',
    // canActivate: [authGuard],
    loadChildren: () => import('./modules/user-profile/user-profile.module').then(e => e.UserProfileModule)
  },
  {
    path: 'dashboard',
    // canActivate: [authGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(e => e.DashboardModule)
  },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'camera', component: CameraAccessComponent },
  { path: '**', component: NotFoundComponent },

];
