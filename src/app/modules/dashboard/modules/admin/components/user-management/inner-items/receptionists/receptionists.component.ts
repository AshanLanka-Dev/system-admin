import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {NewUserComponent} from '../system-users/inner-items/new-user/new-user.component';
import {ViewUserLogComponent} from '../system-users/inner-items/view-user-log/view-user-log.component';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';
import {ApplicationUserRoleService} from '../../../../../../../../services/user-role/application-user-role.service';
import {RequestApplicationRoleDTO} from '../../../../../../../../dto/request-application-role-dto';
import {MessageService} from 'primeng/api';
import {UpdateUserComponent} from '../system-users/inner-items/update-user/update-user.component';
import {
  DeleteDialogContentComponent
} from '../../../../../../../../components/delete-dialog-content/delete-dialog-content.component';
import {SystemUserToolBarComponent} from '../system-users/inner-items/system-user-tool-bar/system-user-tool-bar.component';

import {AdminService} from '../../../../../../../../services/admin/admin.service';
import {TruncatePipe} from '../../../../../../../../pipe/truncate.pipe';
import {ViewUserComponent} from '../system-users/inner-items/view-user/view-user.component';
import {AttachRolesToAdminComponent} from '../system-users/inner-items/attach-roles-to-admin/attach-roles-to-admin.component';
import {Tooltip} from 'primeng/tooltip';
import {ReceptionistToolBarComponent} from './inner-items/receptionist-tool-bar/receptionist-tool-bar.component';
import {UpdateReceptionistsComponent} from './inner-items/update-receptionists/update-receptionists.component';

@Component({
  selector: 'app-receptionists',
  imports: [
    FormsModule,
    // InputText,
    ButtonDirective,
    PrimeTemplate,
    TableModule,
    CommonModule,
    TableModule,
    ButtonModule,
    Dialog,
    // NewUserComponent,
    // ViewUserLogComponent,
    SystemUserToolBarComponent,
    NgxSkeletonLoaderComponent,
    UpdateUserComponent,
    DeleteDialogContentComponent,
    TruncatePipe,
    ViewUserComponent,
    AttachRolesToAdminComponent,
    Tooltip,
    ReceptionistToolBarComponent,
    UpdateReceptionistsComponent
  ],
  templateUrl: './receptionists.component.html',
  styleUrl: './receptionists.component.scss',
  standalone:true
})
export class ReceptionistsComponent implements OnInit {

  @ViewChild(UpdateUserComponent)
  updateUserComponent!:UpdateUserComponent;

  // searchText: string = '';
  admins: any[] = [];
  loading = false;
  visibleEditRoleDialogBox: boolean = false;
  visibleDeleteRoleDialogBox: boolean = false;
  visibleViewUserDialogBox: boolean = false;
  visibleAttachRoleDialogBox: boolean = false;
  selectedUser: any;
  selectedAdminId = '';


  constructor(
    private applicationUserRoleService: ApplicationUserRoleService,
    private messageService: MessageService,
    private adminService:AdminService
  ) {
  }

  ngOnInit() {
    this.getAlldata();

    this.admins = [
      {fullName:'Devinda Lakmal',username:'devinda@gmail.com'},
      {fullName:'Chathuranga Bandara',username:'chathuranga@gmail.com'},
    ]
  }

  getAlldata() {

    // this.adminService.getAllSystemAdmins()
    //   .subscribe({
    //     next: response => {
    //       this.loading = false;
    //       // console.log('response', response.data)
    //       this.admins = response?.data;
    //
    //     },
    //     error: error => {
    //       this.loading = false;
    //       console.log('error', error)
    //       this.messageService.add({severity: 'warn', summary: 'Warn', detail: error?.error?.message});
    //     }
    //   });
  }

  reloadData() {
    this.visibleEditRoleDialogBox = false;
    this.admins = [];
    this.getAlldata();
  }

  viewUser(q:any) {
    // console.log('user:', q);
    this.selectedUser = q ;
    this.visibleViewUserDialogBox = true;
  }

  updateUser(user: any) {
    // console.log('Editing question:', role);
    this.selectedUser = user;
    setTimeout(() => {
      this.visibleEditRoleDialogBox = true;
      // console.log('usery:', this.selectedUser);
    }, 100);
  }

  onUpdateUserDialogHide() {
    if (this.updateUserComponent) {
      this.updateUserComponent.resetForm();
      // console.log('update hide')
    }
  }

  deleteRoleDialogOpen(propertyId: any) {
    // console.log('Deleting question:', propertyId);
    this.visibleDeleteRoleDialogBox = true;
    this.selectedAdminId = propertyId;
  }

  deleteRole() {
    this.adminService.deleteUserByAdmin(this.selectedAdminId)
      .subscribe({
        next: response => {
          this.loading = false;
          // console.log('response', response.data)
          this.messageService.add({severity: 'success', summary: 'Success', detail: response?.message});
          this.visibleDeleteRoleDialogBox = false;
          this.reloadData();
        },
        error: error => {
          this.loading = false;
          console.log('error', error)
          this.messageService.add({severity: 'warn', summary: 'Warn', detail: error?.error?.message});
        }
      });
  }

  canselDelete() {
    this.visibleDeleteRoleDialogBox = false;
  }

  attachRoles(user: any){
    this.selectedUser = user;
    this.visibleAttachRoleDialogBox = true;
  }

  closeAttachAndReload(){
    this.visibleAttachRoleDialogBox = false;
    this.reloadData();
  }

}
