import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {UserRoleToolBarComponent} from '../../../user-management/inner-items/user-roles/inner-items/user-role-tool-bar/user-role-tool-bar.component';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';
import {ApplicationUserRoleService} from '../../../../../../../../services/user-role/application-user-role.service';
import {RequestApplicationRoleDTO} from '../../../../../../../../dto/request-application-role-dto';
import {MessageService} from 'primeng/api';
import {UpdateRoleComponent} from '../../../user-management/inner-items/user-roles/inner-items/update-role/update-role.component';
import {
  DeleteDialogContentComponent
} from '../../../../../../../../components/delete-dialog-content/delete-dialog-content.component';
import {Tooltip} from 'primeng/tooltip';

import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import {TruncatePipe} from '../../../../../../../../pipe/truncate.pipe';
import {QueStatusComponent} from './inner-items/que-status/que-status.component';
import {PetsToolBarComponent} from './inner-items/pets-tool-bar/pets-tool-bar.component';
import {UpdatePetComponent} from './inner-items/update-pet/update-pet.component';

@Component({
  selector: 'app-manage-pets',
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
    Tooltip,
    TruncatePipe,
    QueStatusComponent,
    PetsToolBarComponent,
    UpdatePetComponent
  ],
  templateUrl: './manage-pets.component.html',
  styleUrl: './manage-pets.component.scss',
  standalone:true
})
export class ManagePetsComponent implements OnInit {

  @ViewChild(UpdateRoleComponent)
  updateRoleComponent!: UpdateRoleComponent;

  searchText: string = '';
  roles: any[] = [];
  loading = false;
  visibleEditRoleDialogBox: boolean = false;
  visibleDeleteRoleDialogBox: boolean = false;
  selectedRole: any;
  selectedRoleId = '';

  ownerName = '';


  constructor(
    private applicationUserRoleService: ApplicationUserRoleService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router:Router
  ) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.ownerName = params.get('ownerName') || '';
      console.log('Owner Name:', this.ownerName);

      if(!this.ownerName){
        this.router.navigate(['/dashboard/process/admin/client-management/list']);
        this.messageService.add({severity: 'warn', summary: 'Warn', detail: 'Please select a client' });

      }
    });


    // this.getAlldata();


    this.roles = [
      {petName:'Dog',name:'Luna'},
      {petName:'Cat',name:'Shadow'},


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

  viewPetProfile(pet:any){
    const petId = "pet23545323";
    this.router.navigate(['/dashboard/process/admin/vet-care/pet-profile',petId]);
  }
}
