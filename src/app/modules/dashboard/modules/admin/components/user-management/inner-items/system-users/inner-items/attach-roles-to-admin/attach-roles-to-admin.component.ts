import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ApplicationUserRoleService} from '../../../../../../../../../../services/user-role/application-user-role.service';
import {MessageService} from 'primeng/api';
import {AttachSingleRoleToAminComponent} from './inner-items/attach-single-role-to-amin/attach-single-role-to-amin.component';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-attach-roles-to-admin',
  imports: [
    NgForOf,
    AttachSingleRoleToAminComponent,
    // Divider
  ],
  templateUrl: './attach-roles-to-admin.component.html',
  styleUrl: './attach-roles-to-admin.component.scss',
  standalone:true
})
export class AttachRolesToAdminComponent implements  OnChanges , OnInit {
  @Input() selectedUser: any;
  @Output() reloadUsers = new EventEmitter<void>();

  userId:string = '';
  roles:any;
  userRoles:any;

  constructor(
    private applicationUserRoleService:ApplicationUserRoleService,
    private messageService:MessageService

  ) {
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      // console.log('selected user is (onchnage)', this.selectedUser);
      this.userId = this.selectedUser?.userId;
      this.userRoles = this.selectedUser?.roles;
      // console.log('userRoles', this.userRoles);
      this.mergeRolesWithUserRoles();
    }
  }

  getAllRoles() {
    this.applicationUserRoleService.getAllRoles()
      .subscribe({
        next: response => {
          let allRoles = response?.data || [];
          // Remove role with name 'ADMIN'
          allRoles = allRoles.filter((role: any) => !['ADMIN', 'STUDENT'].includes(role.role));
          this.roles = allRoles;

        },
        error: error => {
          // this.loading = false;
          console.log('error', error)
          this.messageService.add({severity: 'warn', summary: 'Warn', detail: error?.error?.message});
        }
      });
  }


  mergeRolesWithUserRoles() {
    if (!this.roles || !this.userRoles) return;

    // Create a Set of active role propertyIds from userRoles
    const userRoleIds = new Set(this.userRoles.map((ur: any) => ur.propertyId));

    // Map through all roles and mark active = true if it exists in userRoleIds
    this.roles = this.roles.map((role: any) => ({
      ...role,
      active: userRoleIds.has(role.propertyId)
    }));

    // console.log('Merged roles with active state:', this.roles);
  }

}
