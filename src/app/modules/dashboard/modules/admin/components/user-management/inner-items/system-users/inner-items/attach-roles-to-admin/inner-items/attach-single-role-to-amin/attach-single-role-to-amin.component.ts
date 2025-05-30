import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {AdminService} from '../../../../../../../../../../../../services/admin/admin.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-attach-single-role-to-amin',
  imports: [
    NgClass,
  ],
  templateUrl: './attach-single-role-to-amin.component.html',
  styleUrl: './attach-single-role-to-amin.component.scss',
  standalone: true
})
export class AttachSingleRoleToAminComponent implements OnInit {
  @Input() userId!: string;
  @Input() role!: any;
  @Output() roleChanged = new EventEmitter<void>();

  constructor(
    private messageService: MessageService,
  ) {

  }

  // changeUserRoleOfInstructor
  toggleRole() {
    // this.instructorService.changeUserRoleOfInstructor(this.role?.propertyId, this.userId, !this.role.active)
    //   .subscribe({
    //     next: response => {
    //       this.messageService.add({severity: 'success', summary: 'Success', detail: response?.message});
    //       this.roleChanged.emit();
    //     },
    //     error: error => {
    //       // this.loading = false;
    //       console.log('error', error)
    //       this.messageService.add({severity: 'warn', summary: 'Warn', detail: error?.error?.message});
    //     }
    //   });

  }

  ngOnInit(): void {
    // console.log('user ', this.role);
    // console.log('user ID', this.userId);
  }
}
