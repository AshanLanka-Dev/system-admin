import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-sign-out',
  imports: [
    RouterLink
  ],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss',
  standalone:true
})
export class SignOutComponent {
  route:any = '';

  constructor(
    private activatedRoute: Router,
    private tokenService:TokenService
  ) {
    this.route = activatedRoute.url;
  }

  signOut() {
    this.tokenService.logout();
    this.activatedRoute.navigateByUrl('/security/process/login').then(()=>{
      window.location.reload();
    });
  }
}
