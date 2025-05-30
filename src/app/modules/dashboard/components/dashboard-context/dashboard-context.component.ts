import {Component, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {Divider} from 'primeng/divider';
import { MenuItem } from 'primeng/api';
import {Ripple} from 'primeng/ripple';

import {Drawer} from 'primeng/drawer';
import {DashboardHeaderComponent} from '../dashboard-header/dashboard-header.component';
import {TokenService} from '../../../../services/token.service';
import {TruncatePipe} from '../../../../pipe/truncate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-context',
  imports: [
    RouterOutlet,
    NgClass,
    NgIf,
    Divider,
    Ripple,
    RouterLinkActive,
    RouterLink,
    Drawer,
    DashboardHeaderComponent,
    TruncatePipe
  ],
  templateUrl: './dashboard-context.component.html',
  styleUrl: './dashboard-context.component.scss',
  standalone: true
})
export class DashboardContextComponent implements OnInit {

  isActive: boolean = false;
  isOpen: boolean = false;
  isAdmin = true;
  user: any;

  visible: boolean = false;
  isOpenProfileLinks: boolean = false;

  userFullName: string = '';
  userName: string = '';
  userAvatar: string = '';
  userData: any;

  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(private tokenService: TokenService,private router: Router) {
    // Initialize user data in constructor instead of ngAfterViewInit
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

  closeCallback(e: MouseEvent): void {
    this.drawerRef.close(e);
  }

  closeDrawer() {
    // Create a synthetic MouseEvent to pass to the close method
    const event = new MouseEvent('click');
    this.drawerRef.close(event);
  }

  openProfileLinks() {
    this.isOpenProfileLinks = !this.isOpenProfileLinks;
  }

  openSideMenu() {
    this.isActive = !this.isActive;
  }

  toggleMenu(event: MouseEvent) {
    this.isOpen = !this.isOpen;
  }

  items: MenuItem[] | undefined;

  ngOnInit() {
    if (this.tokenService.isAdmin()) {
      this.isAdmin = true;
    }

    this.items = [
      {
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            routerLink: '/sign-out',
          }
        ]
      }
    ];
  }

  logout(){
    this.router.navigateByUrl('/sign-out');
  }
}
