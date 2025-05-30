import {Component, OnInit, Type} from '@angular/core';
import {AdminHeaderComponent} from '../admin-header/admin-header.component';
import {
  BreakCrumbForLmsComponent
} from '../../../../../../components/breakcrumb-for-lms/breakcrumb-for-lms.component';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import {UserRolesComponent} from '../user-management/inner-items/user-roles/user-roles.component';
import {SystemUsersComponent} from '../user-management/inner-items/system-users/system-users.component';
import {TokenService} from '../../../../../../services/token.service';
import {Router, RouterOutlet} from "@angular/router";
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-vet-care',
  imports: [
    AdminHeaderComponent,
    BreakCrumbForLmsComponent,
    TabViewModule, CommonModule, RouterOutlet
  ],
  templateUrl: './vet-care.component.html',
  styleUrl: './vet-care.component.scss',
  standalone:true
})
export class VetCareComponent implements OnInit {
  activeTabIndex: number = 0;

  constructor(
    private tokenService:TokenService,
    private router:Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    // if( !this.tokenService.isAdmin()){
    //   this.router.navigate(['/security/process/verification']);
    // }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      if (currentUrl.includes('/que-history')) {
        this.activeTabIndex = 1;
      }
     else if (currentUrl.includes('/pet-profile')) {
        this.activeTabIndex = 1;
      }
    else {
        this.activeTabIndex = 0;
      }
    });


  }
  handleTabChange(event: any) {
    // Navigate to the appropriate route based on the selected tab
    if (event.index === 0) {
      this.router.navigate(['/dashboard/process/admin/vet-care/que-list']);
    }
    else if (event.index === 1) {
      this.router.navigate(['/dashboard/process/admin/vet-care/pet-profile']);
    }
    else if (event.index === 2) {
      this.router.navigate(['/dashboard/process/admin/vet-care/que-history']);
    }
  }
}
