import {Component, OnInit, Type} from '@angular/core';
import {AdminHeaderComponent} from '../admin-header/admin-header.component';
import {
  BreakCrumbForLmsComponent
} from '../../../../../../components/breakcrumb-for-lms/breakcrumb-for-lms.component';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import {UserRolesComponent} from './inner-items/user-roles/user-roles.component';
import {SystemUsersComponent} from './inner-items/system-users/system-users.component';
import {TokenService} from '../../../../../../services/token.service';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-management',
  imports: [
    AdminHeaderComponent,
    BreakCrumbForLmsComponent,
    TabViewModule, CommonModule, RouterOutlet
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  standalone:true
})
export class UserManagementComponent implements OnInit {
  activeTabIndex: number = 0;

  constructor(
    private tokenService:TokenService,
    private router:Router
    ) {
  }

  ngOnInit() {

    // if( !this.tokenService.isAdmin()){
    //   this.router.navigate(['/security/process/verification']);
    // }
    const currentUrl = this.router.url;

    if (currentUrl.includes('receptionists')) {
      this.activeTabIndex = 2;
    }
   else if (currentUrl.includes('system-users')) {
      this.activeTabIndex = 1;
    } else {
      this.activeTabIndex = 0;
    }


  }
  handleTabChange(event: any) {
    // Navigate to the appropriate route based on the selected tab
    if (event.index === 0) {
      this.router.navigate(['/dashboard/process/admin/user-management/roles']);
    } else if (event.index === 1) {
      this.router.navigate(['/dashboard/process/admin/user-management/system-users']);
    }
    else if (event.index === 2) {
      this.router.navigate(['/dashboard/process/admin/user-management/receptionists']);
    }

  }
}
