import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {NewRoleComponent} from './inner-items/new-role/new-role.component';
import {ViewRoleLogComponent} from './inner-items/view-role-log/view-role-log.component';
import {UserRoleToolBarComponent} from './inner-items/user-role-tool-bar/user-role-tool-bar.component';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';
import {ApplicationUserRoleService} from '../../../../../../../../services/user-role/application-user-role.service';
import {RequestApplicationRoleDTO} from '../../../../../../../../dto/request-application-role-dto';
import {MessageService} from 'primeng/api';
import {UpdateRoleComponent} from './inner-items/update-role/update-role.component';
import {
  DeleteDialogContentComponent
} from '../../../../../../../../components/delete-dialog-content/delete-dialog-content.component';
import {Tooltip} from 'primeng/tooltip';

// interface Question {
//   roleNo: number;
//   role: string;
// }

@Component({
  selector: 'app-user-roles',
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
    // NewRoleComponent,
    // ViewRoleLogComponent,
    UserRoleToolBarComponent,
    NgxSkeletonLoaderComponent,
    UpdateRoleComponent,
    DeleteDialogContentComponent,
    Tooltip
  ],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss',
  standalone: true
})
export class UserRolesComponent implements OnInit {

  @ViewChild(UpdateRoleComponent)
  updateRoleComponent!: UpdateRoleComponent;

  // searchText: string = '';
  roles: any[] = [];
  loading = false;
  visibleEditRoleDialogBox: boolean = false;
  visibleDeleteRoleDialogBox: boolean = false;
  selectedRole: any;
  selectedRoleId = '';


  constructor(
    private applicationUserRoleService: ApplicationUserRoleService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.getAlldata();

    this.roles = [
      {role:'Doctor' },
      {role:'Receptionist' },
      {role:'PetOwner' },
    ]
  }

  getAlldata() {
    // this.applicationUserRoleService.getAllRoles()
    //   .subscribe({
    //     next: response => {
    //       this.loading = false;
    //       // console.log('response', response.data)
    //       this.roles = (response?.data || []).filter((role: any) => role.role !== 'STUDENT');
    //
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
    this.roles = [];
    this.getAlldata();
  }

  // viewRole(q:any) {
  //   console.log('Editing question:', q);
  // }

  updateRole(role: any) {
    // console.log('Editing question:', role);
    this.selectedRole = role;
    setTimeout(() => {
      this.visibleEditRoleDialogBox = true;
      console.log('Editing question11:', this.selectedRole);
    }, 100);

  }

  onUpdateRoleDialogHide() {
    if (this.updateRoleComponent) {
      this.updateRoleComponent.resetForm();
    }
  }

  deleteRoleDialogOpen(propertyId: any) {
    // console.log('Deleting question:', propertyId);
    this.visibleDeleteRoleDialogBox = true;
    this.selectedRoleId = propertyId;
  }

  deleteRole() {
    this.applicationUserRoleService.deleteRole(this.selectedRoleId)
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
}
