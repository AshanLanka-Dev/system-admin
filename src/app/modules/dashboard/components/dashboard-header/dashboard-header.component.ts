import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';
import {Ripple} from 'primeng/ripple';
import {NgClass, NgIf} from '@angular/common';
import {TokenService} from '../../../../services/token.service';
import {TruncatePipe} from '../../../../pipe/truncate.pipe';
import {Subscription} from 'rxjs';
import {Dialog} from "primeng/dialog";
import {
    UpdateClientComponent
} from "../../modules/admin/components/client-management/inner-items/all-clients/inner-items/update-client/update-client.component";
import {QueueHomeComponent} from '../../../medical-queue/components/queue-home/queue-home.component';


@Component({
  selector: 'app-dashboard-header',
  imports: [
    RouterLink,
    Menu,
    Ripple,
    RouterLinkActive,
    NgClass,
    TruncatePipe,
    NgIf,
    Dialog,
    UpdateClientComponent,
    QueueHomeComponent,
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
  standalone: true
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {

  userData: any;
  msgCount: any;
  isAdmin = false;
  private sub!: Subscription;

  items: MenuItem[] | undefined;
  userFullName: string = '';
  userName: string = '';
  userAvatar: string = '';

  visiQueDialogBox = false;

  constructor(
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef
  ) {
    // Load user data in constructor
    this.loadUserData();
  }

  // Method to load user data
  private loadUserData(): void {
    this.userData = this.tokenService.getUserData();
    if (this.userData) {
      this.userFullName = this.userData.fullName || '';
      this.userName = this.userData.username || '';
      this.userAvatar = this.userData.avatarUrl || '';
    }
  }

  ngOnInit() {
    this.isAdmin = this.tokenService.isAdmin();

    // this.sub = this.checkUnseenMailsService.trigger$.subscribe(() => {
    //   this.loadMailCount();
    // });

    this.items = [
      {
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-cog',
            shortcut: '⌘+O',
            routerLink: '/dashboard/process/profile/context/home',
            routerLinkActive: 'active'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q',
            routerLink: '/sign-out',
            routerLinkActive: 'active'
          }
        ]
      }
    ];

    // Load mail count in ngOnInit instead of ngAfterViewInit
    this.loadMailCount();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  loadMailCount() {
    // this.getInTouchService.getUnseenMessageCount().subscribe({
    //   next: response => {
    //     this.msgCount = response?.data;
    //     // Mark for check to handle async updates properly
    //     this.cdr.detectChanges();
    //   },
    //   error: error => {
    //     console.error(error);
    //   }
    // });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '/images/user-profile/avatar-1.png';
  }

  openQue(){
    this.visiQueDialogBox = true;
  }
}
