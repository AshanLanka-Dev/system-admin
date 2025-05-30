import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {VerifyPasswordComponent} from './components/verify-password/verify-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {SecurityContextComponent} from './components/security-context/security-context.component';
import {VerificationPoolComponent} from './components/verification-pool/verification-pool.component';

const routes: Routes = [
  {path: '', redirectTo: '/security/process/login', pathMatch: 'full'},
  {
    path: 'process', component: SecurityContextComponent, children: [
      {path: '', redirectTo: '/teacher/process/login', pathMatch: 'full'},
      {path:'login', component:LoginComponent},
      // {path:'register',component:RegisterComponent},
      {path:'forgot-password',component:ForgotPasswordComponent},
      {path:'verify-password',component:VerifyPasswordComponent},
      {path:'reset-password',component:ResetPasswordComponent},
      {path:'verification',component:VerificationPoolComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
