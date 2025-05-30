import {
  Component,
  EventEmitter, Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {NgClass, NgIf, NgStyle} from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {InputText} from 'primeng/inputtext';
import { NgxIntlTelInputModule, CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Message} from 'primeng/message';
import {MessageService} from 'primeng/api';
import {PrograssSpinnerComponent} from '../../../../../../../../../../components/prograss-spinner/prograss-spinner.component';
import{AdminService} from '../../../../../../../../../../services/admin/admin.service';
import {RequestApplicationUserByAdminDTO} from '../../../../../../../../../../dto/request-application-user-by-admin-dto';
import {RequestUpdateApplicationUserDTO} from '../../../../../../../../../../dto/request-update-application-user-dto';

export interface ContactInfo {
  countryCode: string
  dialCode: string
  e164Number: string
  internationalNumber: string
  nationalNumber: string
  number: string }

@Component({
  selector: 'app-update-user',
  imports: [
    // NgClass,
    FormsModule,
    // InputIcon,
    IconField,
    InputText,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    // Message,
    NgIf,
    PrograssSpinnerComponent,
    NgStyle,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
  standalone:true
})

export class UpdateUserComponent implements OnInit, OnChanges {
  @Input() selectedUser: any;
  @Output() updateUser = new EventEmitter<void>();

  updateSystemUserForm!: FormGroup;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Japan, CountryISO.SriLanka];
  loading: boolean = false;

  // Store initial values
  originalValues = {
    fullName: '',
    username: '',
    phone:''
  };

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private adminService: AdminService
  ) {
    this.updateSystemUserForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [undefined, Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      // console.log('selected user is (onchnage)', this.selectedUser);
      this.setValues();
    }
  }

  setValues(): void {
    this.originalValues = {
      fullName: this.selectedUser?.fullName,
      username: this.selectedUser?.username,
      phone: this.selectedUser?.phoneNumber,
    };


    this.updateSystemUserForm.patchValue({
      fullName: this.originalValues.fullName,
      email: this.originalValues.username,
      phone: this.originalValues.phone
    });
  }

  isFormChanged(): boolean {
    const current = this.updateSystemUserForm.value;

    const isPhoneChanged =
      current.phone?.number !== this.originalValues.phone;

    return (
      current.fullName !== this.originalValues.fullName ||
      current.email !== this.originalValues.username ||
      isPhoneChanged
    );
  }

  createAdmin(): void {
    if (this.updateSystemUserForm.valid) {
      this.loading = true;
      const phone = this.updateSystemUserForm.value.phone as ContactInfo | null;

      const dto: RequestUpdateApplicationUserDTO = {
        fullName: this.updateSystemUserForm.get('fullName')?.value,
        countryCode: phone!.number,
        phoneNumber: phone!.e164Number,
      };

      this.adminService.updateUserByAdmin(this.selectedUser?.userId, dto).subscribe({
        next: response => {
          this.loading = false;
          this.updateSystemUserForm.reset();
          this.updateUser.emit();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message });
        },
        error: error => {
          this.loading = false;
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: error?.error?.message });
        }
      });
    } else {
      this.updateSystemUserForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.updateSystemUserForm.reset();
    this.setValues();
  }
}
