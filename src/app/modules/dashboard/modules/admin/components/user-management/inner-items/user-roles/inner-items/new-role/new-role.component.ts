import {Component, EventEmitter, Output} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {NgClass, NgIf} from '@angular/common';
import {
  PrograssSpinnerComponent
} from '../../../../../../../../../../components/prograss-spinner/prograss-spinner.component';
import {MessageService} from 'primeng/api';
import {ApplicationUserRoleService} from '../../../../../../../../../../services/user-role/application-user-role.service';
import {RequestApplicationRoleDTO} from '../../../../../../../../../../dto/request-application-role-dto';

@Component({
  selector: 'app-new-role',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    NgIf,
    PrograssSpinnerComponent,
    // NgClass
  ],
  templateUrl: './new-role.component.html',
  styleUrl: './new-role.component.scss',
})
export class NewRoleComponent {
  @Output() submitNewRole = new EventEmitter<void>();

  roleForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private messageService:MessageService,
    private applicationUserRoleService:ApplicationUserRoleService
  ) {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.roleForm.valid) {
      this.loading = true;
      const dto :RequestApplicationRoleDTO  = {
        roleName : this.roleForm.get('roleName')?.value,
      }
      this.applicationUserRoleService.createRole(dto)
        .subscribe({
          next: response => {
            this.loading = false;
            this.roleForm.reset();
            this.submitNewRole.emit();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
          },
          error: error  => {
            this.loading = false;
            console.log('error',error)
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
          }
        });

    } else {
      this.loading = false;
      this.roleForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.roleForm.reset();
  }
}
